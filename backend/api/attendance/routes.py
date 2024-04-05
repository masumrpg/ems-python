# TODO buat attendance user
from typing import Optional
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from api.core.database import get_db
from api.core.security import get_current_user, oauth2_scheme, is_superuser
from api.user.attendance.repository import AttendanceRepository
from api.user.attendance.schemas import (
    CreateAttendanceCheckIn,
    CreateAttendanceCheckOut,
)
from api.user.attendance.responses import AttendanceResponse
from api.user.models import UserModel
from api.user.responses import SuccessResponse

user_attendance_router = APIRouter(
    prefix="/user/attendance",
    tags=["User Attendance Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)],
)

admin_attendance_router = APIRouter(
    prefix="/user/attendance",
    tags=["Admin Attendance Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme), Depends(is_superuser)],
)


@user_attendance_router.post(
    "", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
async def create_attendance_check_in(
    attendance: CreateAttendanceCheckIn,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    await AttendanceRepository.create_attendance_check_in(
        attendance, current_user.id, db
    )
    return SuccessResponse(
        message="Attendance recorded successfully. Thank you for checking in!"
    )


@user_attendance_router.patch(
    "", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def create_attendance_check_out(
    attendance: CreateAttendanceCheckOut,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    await AttendanceRepository.create_attendance_check_out(
        attendance, current_user.id, db
    )
    return SuccessResponse(
        message="Attendance recorded successfully. Thank you for checking out!"
    )


# TODO trailing slash disini problem, jadi query param malah minta slash
@admin_attendance_router.get(
    "/", status_code=status.HTTP_200_OK, response_model=AttendanceResponse
)
def get_attendance_today(
    limit: Optional[int] = Query(10, description="Limit of users per page"),
    db: Session = Depends(get_db),
):
    attendance = AttendanceRepository.get_attendance_today(limit, db)
    return attendance


# @admin_attendance_router.put("/{attendance_id}", response_model=SuccessResponse)
# def update_attendance(attendance_id: int, attendance: schemas.AttendanceUpdate, db: Session = Depends(get_db)):
#     db_attendance = crud.get_attendance_by_id(db, attendance_id=attendance_id)
#     if db_attendance is None:
#         raise HTTPException(status_code=404, detail="Attendance not found")
#     return crud.update_attendance(db=db, attendance=attendance, db_attendance=db_attendance)
#
#
@admin_attendance_router.delete("/{attendance_id}", response_model=SuccessResponse)
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    AttendanceRepository.delete_attendance(attendance_id, db)
    return SuccessResponse(message="Success delete attendance")
