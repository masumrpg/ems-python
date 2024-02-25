from typing import List
from fastapi import APIRouter, status, Depends, Request
from sqlalchemy.orm import Session
from core.database import get_db
from user.schemas import CreateUserDetailRequest, CreateUserRequest
from user.services import (
    create_user_account_services,
    create_user_detail_by_id_services,
    create_user_detail_services,
    delete_user_by_id_services,
    get_all_user_services,
    get_user_by_id_services,
    update_user_detail_by_id_services,
    update_user_detail_services,
)
from core.security import get_current_user, is_superuser, oauth2_scheme
from user.responses import SuccessResponse, UserWithDetilResponse

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
async def create_user(data: CreateUserRequest, db: Session = Depends(get_db)):
    res = await create_user_account_services(data=data, db=db)
    return res


@user_router.post(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def create_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    res = await create_user_detail_services(data, request, db)
    return res


@user_router.get(
    "/me", status_code=status.HTTP_200_OK, response_model=UserWithDetilResponse
)
async def get_me(
    current_user: UserWithDetilResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user.id
    res = await get_user_by_id_services(user_id, db)
    return res


@user_router.patch(
    "/detail/me", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def update_user_detail_me(
    data: CreateUserDetailRequest, request: Request, db: Session = Depends(get_db)
):
    res = await update_user_detail_services(data, request, db)
    return res


@admin_router.post(
    "/detail/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def create_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    res = await create_user_detail_by_id_services(data, user_id, db)
    return res


@admin_router.get(
    "", status_code=status.HTTP_200_OK, response_model=List[UserWithDetilResponse]
)
async def get_all_user(db: Session = Depends(get_db)):
    users = await get_all_user_services(db=db)
    return users


@admin_router.get(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=UserWithDetilResponse
)
async def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = await get_user_by_id_services(user_id, db)
    return user


@admin_router.patch(
    "/detail/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def update_user_detail_by_id(
    data: CreateUserDetailRequest, user_id: str, db: Session = Depends(get_db)
):
    res = await update_user_detail_by_id_services(data, user_id, db)
    return res


@admin_router.delete(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=SuccessResponse
)
async def delete_user_by_id(user_id: str, db: Session = Depends(get_db)):
    # db: Session = Depends(get_db)
    res = await delete_user_by_id_services(user_id, db)
    return res
