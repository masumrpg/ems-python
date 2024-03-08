from typing import List
from fastapi import APIRouter, status, Depends, Request
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.services import (
    create_user_services,
    create_user_detail_by_id_services,
    create_user_detail_services,
    delete_user_by_id_services,
    get_all_user_services,
    get_me_by_id_services,
    get_user_by_id_services,
    update_user_detail_by_id_services,
    update_user_detail_services,
)
from api.core.security import get_current_user, is_superuser, oauth2_scheme
from api.user.responses import SuccessResponse, UserResponse, UserWithDetilResponse

router = APIRouter(
    prefix="/user",
    tags=["User"],
    responses={404: {"description": "Not found"}},
)

user_router = APIRouter(
    prefix="/user",
    tags=["User"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)],
)


admin_router = APIRouter(
    prefix="/user",
    tags=["Admin"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme), Depends(is_superuser)],
)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
def create_user(data: CreateUserRequest):
    create_user_services(data=data)
    return SuccessResponse(message="User account has been successfully created.")


@user_router.post(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def create_user_detail_me(
    data: CreateUserDetailRequest, request: Request
):
    create_user_detail_services(data, request)
    return SuccessResponse(message="User detail has been succesfully created.")


@user_router.get(
    "/me", status_code=status.HTTP_200_OK, response_model=UserResponse
)
def get_me(
    current_user: UserResponse = Depends(get_current_user)
):
    user_id = current_user.id
    res = get_me_by_id_services(user_id)
    return res


@user_router.patch(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_me(
    data: CreateUserDetailRequest, request: Request
):
    update_user_detail_services(data, request)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.post(
    "/detail/{user_id}", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
def create_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str
):
    create_user_detail_by_id_services(data, user_id)
    return SuccessResponse(message="User detail has been succesfully created.")


@admin_router.get(
    "", status_code=status.HTTP_200_OK, response_model=List[UserResponse]
)
def get_all_user():
    users = get_all_user_services()
    return users


@admin_router.get(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=UserWithDetilResponse
)
def get_user_by_id(user_id: str):
    user = get_user_by_id_services(user_id)
    return user


@admin_router.patch(
    "/detail/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str
):
    update_user_detail_by_id_services(data, user_id)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.delete(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def delete_user_by_id(user_id: str):
    delete_user_by_id_services(user_id)
    return SuccessResponse(message="User has been succesfully deleted.")
