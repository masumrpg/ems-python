from typing import List
from fastapi import APIRouter, status, Depends, Request
from sqlalchemy.orm import Session
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.services import (
    AdminService,
    PublicService,
    UserService,
)
from api.core.security import get_current_user, is_superuser, oauth2_scheme
from api.user.responses import SuccessResponse, UserResponse, UserWithDetilResponse
from api.core.database import get_db

public_router = APIRouter(
    prefix="/user",
    tags=["Public Acconuts Api"],
    responses={404: {"description": "Not found"}},
)

user_router = APIRouter(
    prefix="/user",
    tags=["User Acconuts Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)],
)


admin_router = APIRouter(
    prefix="/user",
    tags=["Admin Acconuts Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme), Depends(is_superuser)],
)


@public_router.post("", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
def create_user(data: CreateUserRequest, db: Session = Depends(get_db)):
    PublicService.create_user_service(data, db)
    return SuccessResponse(message="User account has been successfully created.")


@user_router.post(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def create_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    UserService.create_user_detail_service(data, request, db)
    return SuccessResponse(message="User detail has been succesfully created.")


@user_router.get(
    "/me", status_code=status.HTTP_200_OK, response_model=UserResponse
)
def get_me(
    current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)
):
    user_id = current_user.id
    user = UserService.get_me_by_req_service(user_id, db)
    return user


@user_router.patch(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    user_id = request.user.id
    UserService.update_user_detail_service(data, user_id, db)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.post(
    "/detail/{user_id}", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
def create_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    AdminService.create_user_detail_by_id_service(data, user_id, db)
    return SuccessResponse(message="User detail has been succesfully created.")


@admin_router.get(
    "", status_code=status.HTTP_200_OK, response_model=List[UserResponse]
)
def get_all_user(db: Session = Depends(get_db)):
    users = AdminService.get_all_user_service(db)
    return users


@admin_router.get(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=UserWithDetilResponse
)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = AdminService.get_user_by_id_service(user_id, db)
    return user


@admin_router.patch(
    "/detail/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    AdminService.update_user_detail_by_id_service(data, user_id, db)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.delete(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def delete_user_by_id(user_id: str, db: Session = Depends(get_db)):
    AdminService.delete_user_by_id_service(user_id, db)
    return SuccessResponse(message="User has been succesfully deleted.")
