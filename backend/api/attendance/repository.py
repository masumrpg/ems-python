from typing import List
from pytz import timezone
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import and_, func
from sqlalchemy.orm import Session

from api.core.database import commit_rollback
from api.attendance.responses import ContentAttendanceResponse, AttendanceResponse
from api.models import AttendanceModel, UserModel


# Fungsi untuk mendapatkan waktu saat ini dalam zona waktu Jakarta
def get_current_time_jakarta():
    jakarta = timezone("Asia/Jakarta")
    return datetime.now(jakarta)


def get_attendance_check_in_for_user(user_id, db):
    attendance_check_in_utc = (
        db.query(AttendanceModel.check_in)
        .filter(AttendanceModel.user_id == user_id)
        .all()
    )
    return attendance_check_in_utc


def check_in_today_in_jakarta(attendance_check_ins):
    # Mendapatkan zona waktu Jakarta
    jakarta_timezone = timezone("Asia/Jakarta")
    # Mendapatkan tanggal hari ini dalam zona waktu Jakarta
    today_in_jakarta = datetime.now(jakarta_timezone).date()

    # Iterasi setiap waktu check_in yang ditemukan
    for check_in in attendance_check_ins:
        # Konversi check_in ke zona waktu Jakarta
        check_in_jakarta = check_in[0].astimezone(jakarta_timezone)
        # Cek apakah check_in terjadi pada hari yang sama dengan hari ini di zona waktu Jakarta
        if check_in_jakarta.date() == today_in_jakarta:
            return True

    return False


# Fungsi untuk memeriksa apakah waktu berada dalam rentang yang diizinkan
def attendance_time_allowed(current_time_input, start_hour: int, end_hour: int):
    current_time = current_time_input
    start_time = current_time.replace(
        hour=start_hour, minute=0, second=0, microsecond=0
    )
    end_time = current_time.replace(hour=end_hour, minute=0, second=0, microsecond=0)

    return start_time <= current_time <= end_time


class AttendanceRepository:
    @staticmethod
    async def create_attendance_check_in(
        user_id: str,
        db: Session,
    ):
        # Memeriksa waktu saat ini dalam zona waktu Jakarta
        current_time_jakarta = get_current_time_jakarta()
        today_in_jakarta = get_current_time_jakarta().date()

        if not attendance_time_allowed(current_time_jakarta, 6, 8):
            raise HTTPException(
                status_code=409,
                detail="Attendance can only be taken between 6:00 AM and 8:00 AM in Western Indonesian Time time zone",
            )

        attendance_today = (
            db.query(AttendanceModel)
            .filter(
                AttendanceModel.user_id == user_id,
                func.date(func.timezone("Asia/Jakarta", AttendanceModel.check_in))
                == today_in_jakarta,
            )
            .first()
        )

        if attendance_today:
            raise HTTPException(status_code=409, detail="Attendance already exists")

        new_attendance = AttendanceModel(user_id=user_id, check_in=current_time_jakarta)

        db.add(new_attendance)
        commit_rollback()

    @staticmethod
    async def create_attendance_check_out(user_id: str, db: Session):
        # Memeriksa waktu saat ini dalam zona waktu Jakarta
        current_time_jakarta = get_current_time_jakarta()
        today_in_jakarta = get_current_time_jakarta().date()

        # Memeriksa apakah waktu saat ini berada dalam rentang yang diizinkan
        if not attendance_time_allowed(current_time_jakarta, 17, 22):
            raise HTTPException(
                status_code=409,
                detail="Attendance can only be taken between 17:00 and 22:00 in Western Indonesian Time time zone",
            )

        # Query untuk mencari check_out pengguna pada hari ini di zona waktu Jakarta
        attendance_today = (
            db.query(AttendanceModel)
            .filter(
                AttendanceModel.user_id == user_id,
                func.date(func.timezone("Asia/Jakarta", AttendanceModel.check_in))
                == today_in_jakarta,
            )
            .first()
        )

        # Memeriksa apakah pengguna sudah absen hari ini
        if not attendance_today:
            raise HTTPException(status_code=404, detail="You have not attended today")

        # Memeriksa apakah pengguna sudah check-out sebelumnya
        if attendance_today.check_out:
            raise HTTPException(status_code=400, detail="You have already checked out")

        # Menetapkan waktu check-out
        attendance_today.check_out = current_time_jakarta
        commit_rollback()

    @staticmethod
    def get_attendance_today(limit: int, db: Session):
        # Query
        query = db.query(AttendanceModel)
        today_in_jakarta = get_current_time_jakarta().date()

        # Query untuk mencari kehadiran pengguna pada hari ini
        attendance_today = query.filter(
            and_(
                func.date(func.timezone("Asia/Jakarta", AttendanceModel.check_in))
                == today_in_jakarta
            )
        )

        if limit:
            attendance_today = attendance_today.limit(limit).all()
        else:
            attendance_today = attendance_today.all()

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
                id=attendance.id,
                user_id=attendance.user_id,
                full_name=full_name,
                check_in=attendance.check_in,
                check_out=attendance.check_out,
            )
            attendance_response.append(attendances)

        return AttendanceResponse(limit=limit, content=attendance_response)

    @staticmethod
    def delete_attendance(attendance_id: int, db: Session):
        # Mencari kehadiran berdasarkan ID
        attendance = (
            db.query(AttendanceModel)
            .filter(AttendanceModel.id == attendance_id)
            .first()
        )
        if not attendance:
            raise HTTPException(status_code=404, detail="Attendance not found")

        # Menghapus kehadiran dari database
        db.delete(attendance)
        commit_rollback()
