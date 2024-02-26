from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class CreateUserRequest(BaseModel):
    full_name: str = Field(
        min_length=3,
        max_length=200,
        pattern=r"[A-Z][a-z]+(?: [A-Z][a-z]+)?",
        examples=["Masum"],
    )
    username: str = Field(
        min_length=5, max_length=100, pattern=r"^[a-z0-9]+$", examples=["masumrpg"]
    )
    email: EmailStr = Field(examples=["masumrpg@gmail.com"])
    password: str = Field(min_length=8, pattern=r"^\S*$")


class CreateAddressRequest(BaseModel):
    postal_code: str = Field(
        min_length=5, max_length=5, pattern=r"\d+", examples=["54366"]
    )
    village: str = Field(min_length=2, max_length=20, examples=["Serut"])
    subdistrict: str = Field(min_length=4, max_length=20, examples=["Kuwarasan"])
    city: str = Field(min_length=4, max_length=25, examples=["Kebumen"])
    province: str = Field(min_length=4, max_length=25, examples=["Jawa Tengah"])
    country: str = Field(min_length=4, max_length=25, examples=["Indonesia"])


class CreateUserDetailRequest(BaseModel):
    address: Optional[CreateAddressRequest] = None
    phone: str = Field(
        min_length=4, max_length=20, pattern=r"\d+", examples=["085218939086"]
    )
    dob: date
    gender: str = Field(min_length=4, max_length=20, examples=["Pria"])
    marital_status: str = Field(min_length=4, max_length=10, examples=["Lajang"])
    id_card: str = Field(
        min_length=16, max_length=16, pattern=r"\d+", examples=["3305161010970001"]
    )
    religion: str = Field(min_length=4, max_length=8, examples=["Islam"])
    tertiary_education: str = Field(
        min_length=4, max_length=50, examples=["Sarjana Manajemen"]
    )
    job: str = Field(min_length=4, max_length=10, examples=["Developer"])
    salary: int = Field(
        min_length=4, max_length=50, pattern=r"\d+", examples=["5000000"]
    )

    class Config:
        arbitrary_types_allowed = True


class CreateUserWithDetailRequest(BaseModel):
    full_name: str = Field(
        min_length=3,
        max_length=200,
        pattern=r"[A-Z][a-z]+(?: [A-Z][a-z]+)?",
        examples=["Masum"],
    )
    username: str = Field(
        min_length=5, max_length=100, pattern=r"^[a-z0-9]+$", examples=["masumrpg"]
    )
    email: EmailStr = Field(examples=["masumrpg@gmail.com"])
    password: str = Field(min_length=8, pattern=r"^\S*$")
    user_detail: Optional[CreateUserDetailRequest] = None

    class Config:
        arbitrary_types_allowed = True
