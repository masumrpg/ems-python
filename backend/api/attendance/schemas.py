from datetime import datetime

from pydantic import BaseModel


class CreateAttendanceCheckIn(BaseModel):
    check_in: datetime


class CreateAttendanceCheckOut(BaseModel):
    check_out: datetime
