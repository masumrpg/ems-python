from typing import Optional
from fastapi import APIRouter, Query, status, Depends, Request
from sqlalchemy.orm import Session

from api.models import UserModel
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.core.security import get_current_user, is_superuser, oauth2_scheme
from api.user.responses import SuccessResponse, UserPaginationResponse, UserResponse, UserWithDetilResponse
from api.core.database import get_db
from api.user.repository import UserRepository

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


@public_router.post(
    "", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
def create_user(data: CreateUserRequest, db: Session = Depends(get_db)):
    UserRepository.create_user(data, db)
    return SuccessResponse(message="User account has been successfully created.")


@user_router.post(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def create_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    UserRepository.create_user_detail_by_me(data, request, db)
    return SuccessResponse(message="User detail has been succesfully created.")


@user_router.get("/me", status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_me(
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user.id
    user = UserRepository.get_user_by_id(user_id, db)
    return user


@user_router.patch(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    user_id = request.user.id
    UserRepository.update_user_detail_by_id(data, user_id, db)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.post(
    "/detail/{user_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
)
def create_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    UserRepository.create_user_detail_by_id(data, user_id, db)
    return SuccessResponse(message="User detail has been succesfully created.")


@admin_router.get("", status_code=status.HTTP_200_OK, response_model=UserPaginationResponse)
def get_all_users(
    pagination: bool = Query(True, description="Enable pagination"),
    limit: Optional[int] = Query(10, description="Limit of users per page"),
    page: Optional[int] = Query(1, description="Page number"),
    columns: Optional[str] = Query(None, description="Columns to display"),
    sort: Optional[str] = Query(None, description="Sort by specific column"),
    filter_by: Optional[str] = Query(None, description="Filter by specific column"),
    filter_value: Optional[str] = Query(None, description="Filter value"),
    db: Session = Depends(get_db),
):
    users = UserRepository.get_all(pagination, limit, page, columns, sort, filter_by, filter_value, db)
    return users


@admin_router.get(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=UserWithDetilResponse
)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = UserRepository.get_user_by_id(user_id, db)
    return user


@admin_router.patch(
    "/detail/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def update_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    UserRepository.update_user_detail_by_id(data, user_id, db)
    return SuccessResponse(message="User detail has been successfully updated.")


@admin_router.delete(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
def delete_user_by_id(user_id: str, db: Session = Depends(get_db)):
    UserRepository.delete_user_by_id(user_id, db)
    return SuccessResponse(message="User has been succesfully deleted.")
