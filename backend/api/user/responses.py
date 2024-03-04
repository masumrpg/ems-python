from pydantic import ConfigDict, BaseModel, EmailStr
from typing import Optional, Union
from datetime import date, datetime


class BaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, arbitrary_types_allowed=True)


class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    full_name: str
    is_active: bool
    is_superuser: bool
    is_verified: bool
    verified_at: Union[None, datetime] = None
    created_at: Union[None, datetime] = None


class AddressResponse(BaseModel):
    postal_code: str
    village: str
    subdistrict: str
    city: str
    province: str
    country: str


class UserDetailResponse(BaseModel):
    user_detail_id: int
    address: Optional[AddressResponse] = None
    phone: str
    dob: date = None
    gender: str
    marital_status: str
    id_card: str
    religion: str
    tertiary_education: str
    job: str
    salary: int


class UserWithDetilResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    full_name: str
    is_active: bool
    is_superuser: bool
    is_verified: bool
    verified_at: Union[None, datetime] = None
    created_at: Union[None, datetime] = None
    user_detail: Optional[UserDetailResponse] = None


class SuccessResponse(BaseModel):
    message: str
