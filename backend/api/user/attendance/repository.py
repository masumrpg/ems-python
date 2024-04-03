from typing import List
from pytz import timezone
from datetime import datetime, date
from fastapi import HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session

from api.core.database import commit_rollback
from api.user.attendance.schemas import (
    CreateAttendanceCheckIn,
    CreateAttendanceCheckOut,
)
from api.user.attendance.responses import ContentAttendanceResponse, AttendanceResponse
from api.user.models import AttendanceModel, UserModel

# Mengatur tanggal awal dan akhir hari ini
today_start = datetime.combine(date.today(), datetime.min.time())
today_end = datetime.combine(date.today(), datetime.max.time())


# Fungsi untuk mendapatkan waktu saat ini dalam zona waktu Jakarta
def get_current_time_jakarta():
    jakarta = timezone("Asia/Jakarta")
    return datetime.now(jakarta)


# Fungsi untuk memeriksa apakah waktu berada dalam rentang yang diizinkan
def attendance_time_allowed(current_time, start_hour: int, end_hour: int):
    start_time = current_time.replace(
        hour=start_hour, minute=0, second=0, microsecond=0
    )
    end_time = current_time.replace(hour=end_hour, minute=0, second=0, microsecond=0)
    return start_time <= current_time <= end_time


class AttendanceRepository:
    @staticmethod
    async def create_attendance_check_in(
        attendance: CreateAttendanceCheckIn, user_id: str, db: Session
    ):
        # Query
        query = db.query(AttendanceModel)
        # Memeriksa waktu saat ini dalam zona waktu Jakarta
        current_time_jakarta = get_current_time_jakarta()

        # TODO disini di offkan dulu untuk testing
        # Memeriksa apakah waktu saat ini berada dalam rentang yang diizinkan
        # if not attendance_time_allowed(current_time_jakarta, 6, 7):
        #     raise HTTPException(
        #         status_code=409,
        #         detail="Attendance can only be taken between 6:00 AM and 7:00 AM in Western Indonesian Time time zone",
        #     )

        # Query untuk mencari kehadiran pengguna pada hari ini
        attendance_today = query.filter(
            and_(
                AttendanceModel.user_id == user_id,
                AttendanceModel.check_in >= today_start,
                AttendanceModel.check_in <= today_end,
            )
        ).all()

        # Memeriksa apakah ada kehadiran pada hari ini
        if attendance_today:
            raise HTTPException(status_code=409, detail="Attendance already exists")

        new_attendance = AttendanceModel(user_id=user_id, check_in=attendance.check_in)

        db.add(new_attendance)
        commit_rollback()

    @staticmethod
    async def create_attendance_check_out(
        attendance: CreateAttendanceCheckOut, user_id: str, db: Session
    ):
        # Query
        query = db.query(AttendanceModel)

        # Memeriksa waktu saat ini dalam zona waktu Jakarta
        current_time_jakarta = get_current_time_jakarta()

        # TODO disini di offkan dulu untuk testing
        # Memeriksa apakah waktu saat ini berada dalam rentang yang diizinkan
        # if not attendance_time_allowed(current_time_jakarta, 17, 22):
        #     raise HTTPException(
        #         status_code=409,
        #         detail="Attendance can only be taken between 17:00 and 22:00 in Western Indonesian Time time zone",
        #     )

        # Query untuk mencari kehadiran pengguna pada hari ini
        attendance_today = query.filter(
            and_(
                AttendanceModel.user_id == user_id,
                AttendanceModel.check_in >= today_start,
                AttendanceModel.check_in <= today_end,
            )
        ).first()

        # Memeriksa apakah pengguna sudah absen hari ini
        if not attendance_today:
            raise HTTPException(status_code=404, detail="You have not attended today")

        # Memeriksa apakah pengguna sudah check-out sebelumnya
        if attendance_today.check_out:
            raise HTTPException(status_code=400, detail="You have already checked out")

        # Menetapkan waktu check-out
        attendance_today.check_out = attendance.check_out
        commit_rollback()

    @staticmethod
    def get_attendance_today(limit: int, db: Session):
        # Query
        query = db.query(AttendanceModel)

        # Query untuk mencari kehadiran pengguna pada hari ini
        attendance_today = query.filter(
            and_(
                AttendanceModel.check_in >= today_start,
                AttendanceModel.check_in <= today_end,
            )
        )

        if limit:
            attendance_today = attendance_today.limit(limit).all()

        if not attendance_today:
            raise HTTPException(
                status_code=200, detail="There are no attendance records for today."
            )

        attendance_response: List[ContentAttendanceResponse] = []

        # Looping untuk mengambil data kehadiran dengan informasi nama lengkap pengguna
        for attendance in attendance_today:
            user = (
                db.query(UserModel).filter(UserModel.id == attendance.user_id).first()
            )
            full_name = user.full_name if user else "Unknown"
            attendances = ContentAttendanceResponse(
                user_id=attendance.user_id,
                full_name=full_name,
                check_in=attendance.check_in,
                check_out=attendance.check_out,
            )
            attendance_response.append(attendances)

        return AttendanceResponse(limit=limit, content=attendance_response)
