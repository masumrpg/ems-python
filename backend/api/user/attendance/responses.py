from datetime import datetime
from typing import TypeVar, Optional, List

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class BaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)


class ContentAttendanceResponse(BaseResponse):
    user_id: str
    full_name: str
    check_in: datetime
    check_out: datetime


class AttendanceResponse(BaseResponse):
    limit: int
    content: Optional[List[ContentAttendanceResponse]] = None