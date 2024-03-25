from datetime import datetime
from typing import List, Optional
from fastapi import Query, Request, logger, status, Depends
from sqlalchemy.orm import aliased, Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi.exceptions import HTTPException
from api.user.models import AddressModel, UserDetailModel, UserModel
from api.core.security import get_password_hash
from api.core.database import commit_rollback, get_db
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.responses import (
    UserResponse,
    AddressResponse,
    UserDetailResponse,
    UserPaginationResponse,
    UserWithDetilResponse,
)
import re


def map_user_model_to_response(user_model: UserModel):
    return UserResponse(
        id=str(user_model.id),
        username=user_model.username,
        email=user_model.email,
        full_name=user_model.full_name,
        is_active=user_model.is_active,
        is_superuser=user_model.is_superuser,
        is_verified=user_model.is_verified,
        verified_at=user_model.verified_at,
        created_at=user_model.created_at,
    )


def apply_filter(
    users: List[UserResponse], filter_by: str, filter_value: str
) -> List[UserResponse]:
    """Apply filter to the list of users."""
    if filter_by and filter_value:
        # Filter dengan mencari kecocokan parsial
        filtered_users = [
            user
            for user in users
            if re.search(filter_value, getattr(user, filter_by), re.IGNORECASE)
        ]
        return filtered_users
    return users


def apply_sort(
    users: List[UserResponse], sort_by: str, reverse: bool = False
) -> List[UserResponse]:
    # Filter objek yang tidak memiliki nilai untuk atribut yang digunakan sebagai kunci pengurutan
    filtered_users = [
        user for user in users if getattr(user, sort_by, None) is not None
    ]
    # Lakukan pengurutan
    return sorted(filtered_users, key=lambda x: getattr(x, sort_by), reverse=reverse)


class UserRepository:
    @staticmethod
    def create_user(data: CreateUserRequest, db: Session):
        username_exists = (
            db.query(UserModel).filter(UserModel.username == data.username).first()
        )
        email_exists = db.query(UserModel).filter(UserModel.email == data.email).first()

        if username_exists:
            raise HTTPException(status_code=409, detail="Username already exists")

        if email_exists:
            raise HTTPException(status_code=409, detail="Email already exists")

        new_user = UserModel(
            username=data.username,
            full_name=data.full_name,
            email=data.email,
            password=get_password_hash(data.password),
            is_active=True,
            is_verified=True,
            updated_at=datetime.now(),
        )

        db.add(new_user)
        commit_rollback()

    @staticmethod
    def create_user_detail_by_me(
        data: CreateUserDetailRequest, request: Request, db: Session
    ):
        user_id = request.user.id

        # Cek apakah detail pengguna sudah ada
        if db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first():
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="User detail is already exist.",
            )

        new_user_detail = UserDetailModel(
            phone=data.phone,
            dob=data.dob,
            gender=data.gender,
            marital_status=data.marital_status,
            id_card=data.id_card,
            religion=data.religion,
            tertiary_education=data.tertiary_education,
            job=data.job,
            salary=data.salary,
            user_id=user_id,
        )
        db.add(new_user_detail)
        commit_rollback()

        db_user_detail_new = (
            db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first()
        )
        if not db_user_detail_new:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong",
            )

        new_detail_address = AddressModel(
            postal_code=data.address.postal_code,
            village=data.address.village,
            subdistrict=data.address.subdistrict,
            city=data.address.city,
            province=data.address.province,
            country=data.address.country,
            user_detail_id=db_user_detail_new.user_detail_id,
        )

        db.add(new_detail_address)
        commit_rollback()

    @staticmethod
    def create_user_detail_by_id(
        data: CreateUserDetailRequest, user_id: str, db: Session
    ):
        db_user: UserModel = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
            )

        db_user_detail: UserDetailModel = (
            db.query(UserDetailModel)
            .filter(UserDetailModel.user_id == db_user.id)
            .first()
        )
        if db_user_detail:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="User detail is already exist.",
            )

        new_user_detail = UserDetailModel(
            phone=data.phone,
            dob=data.dob,
            gender=data.gender,
            marital_status=data.marital_status,
            id_card=data.id_card,
            religion=data.religion,
            tertiary_education=data.tertiary_education,
            job=data.job,
            salary=data.salary,
            user_id=db_user.id,
        )
        db.add(new_user_detail)
        db.commit()
        db.refresh(new_user_detail)

        db_user_detail_new: UserDetailModel = (
            db.query(UserDetailModel)
            .filter(UserDetailModel.user_id == db_user.id)
            .first()
        )

        if not db_user_detail_new:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong",
            )

        new_detail_address = AddressModel(
            postal_code=data.address.postal_code,
            village=data.address.village,
            subdistrict=data.address.subdistrict,
            city=data.address.city,
            province=data.address.province,
            country=data.address.country,
            user_detail_id=db_user_detail_new.user_detail_id,
        )

        db.add(new_detail_address)
        commit_rollback()

        if not new_detail_address:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong",
            )

    @staticmethod
    def get_user_by_id(user_id: str, db: Session):
        db_user: UserModel = db.query(UserModel).filter(UserModel.id == user_id).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        db_user_detail: UserDetailModel = (
            db.query(UserDetailModel)
            .filter(UserDetailModel.user_id == db_user.id)
            .first()
        )
        if db_user_detail:
            db_address: AddressModel = (
                db.query(AddressModel)
                .filter(AddressModel.user_detail_id == db_user_detail.user_detail_id)
                .first()
            )
        else:
            db_address = None

        if db_address:
            address_response = AddressResponse(
                postal_code=db_address.postal_code,
                village=db_address.village,
                subdistrict=db_address.subdistrict,
                city=db_address.city,
                province=db_address.province,
                country=db_address.country,
            )
        else:
            address_response = None

        if db_user_detail:
            user_detail_response = UserDetailResponse(
                user_detail_id=db_user_detail.user_detail_id,
                address=address_response,
                phone=db_user_detail.phone,
                dob=str(db_user_detail.dob),
                gender=db_user_detail.gender,
                marital_status=db_user_detail.marital_status,
                id_card=db_user_detail.id_card,
                religion=db_user_detail.religion,
                tertiary_education=db_user_detail.tertiary_education,
                job=db_user_detail.job,
                salary=db_user_detail.salary,
            )
        else:
            user_detail_response = None

        user_response = UserWithDetilResponse(
            id=db_user.id,
            username=db_user.username,
            email=db_user.email,
            full_name=db_user.full_name,
            is_active=db_user.is_active,
            is_superuser=db_user.is_superuser,
            is_verified=db_user.is_verified,
            verified_at=str(db_user.verified_at) if db_user.verified_at else None,
            created_at=str(db_user.created_at),
            user_detail=user_detail_response,
        )

        if user_response is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        return user_response

    @staticmethod
    def update_user_detail_by_id(
        data: CreateUserDetailRequest, user_id: str, db: Session
    ):
        db_user_detail: UserDetailModel = (
            db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first()
        )
        if not db_user_detail:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User detail not found."
            )

        db_user_address: AddressModel = (
            db.query(AddressModel)
            .filter(AddressModel.user_detail_id == db_user_detail.user_detail_id)
            .first()
        )
        if not db_user_address:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User address not found."
            )

        # Perbarui properti objek db_user_detail
        db_user_detail.phone = data.phone
        db_user_detail.dob = data.dob
        db_user_detail.gender = data.gender
        db_user_detail.marital_status = data.marital_status
        db_user_detail.id_card = data.id_card
        db_user_detail.religion = data.religion
        db_user_detail.tertiary_education = data.tertiary_education
        db_user_detail.job = data.job
        db_user_detail.salary = data.salary

        # Perbarui properti objek new_detail_address jika perlu, atau buat objek baru
        if db_user_address:
            db_user_address.postal_code = data.address.postal_code
            db_user_address.village = data.address.village
            db_user_address.subdistrict = data.address.subdistrict
            db_user_address.city = data.address.city
            db_user_address.province = data.address.province
            db_user_address.country = data.address.country
        else:
            new_detail_address = AddressModel(
                postal_code=data.address.postal_code,
                village=data.address.village,
                subdistrict=data.address.subdistrict,
                city=data.address.city,
                province=data.address.province,
                country=data.address.country,
                user_detail_id=db_user_detail.user_detail_id,
            )
            db.add(new_detail_address)

        commit_rollback()

    @staticmethod
    def delete_user_by_id(user_id: str, db: Session):
        # Aliases untuk tabel UserDetailModel dan AddressModel
        User = aliased(UserModel)
        UserDetail = aliased(UserDetailModel)
        Address = aliased(AddressModel)

        try:
            user: UserModel = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
                )

            user_detail: UserDetailModel = (
                db.query(UserDetail).filter(UserDetail.user_id == user_id).first()
            )
            if not user_detail:
                user_detail = None

            if user_detail:
                user_address: AddressModel = (
                    db.query(Address)
                    .filter(Address.user_detail_id == user_detail.user_detail_id)
                    .first()
                )
            else:
                user_address = None

            if user:
                db.delete(user)
            if user_detail:
                db.delete(user_detail)
            if user_address:
                db.delete(user_address)

            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            logger.error(f"Failed to query users: {str(e)}")

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    # get all
    @staticmethod
    def get_all(
        pagination: bool = Query(True, description="Enable pagination"),
        limit: Optional[int] = Query(10, description="Limit of users per page"),
        page: Optional[int] = Query(1, description="Page number"),
        columns: Optional[str] = Query(None, description="Columns to display"),
        sort: Optional[str] = Query(None, description="Sort by specific column"),
        filter_by: Optional[str] = Query(None, description="Filter by specific column"),
        filter_value: Optional[str] = Query(None, description="Filter value"),
        db: Session = Depends(get_db()),
    ):
        # query to db
        users = db.query(UserModel).all()
        user_responses = [map_user_model_to_response(user) for user in users]

        # Mengaplikasikan filter jika diberikan
        filtered_users = user_responses
        # Default sort
        filtered_users = apply_sort(filtered_users, "full_name", reverse=False)
        from_total = len(filtered_users)

        if filter_by and filter_value:
            # filtered_users = apply_filter(filtered_users, {filter_by: filter_value})
            filtered_users = apply_filter(filtered_users, filter_by, filter_value)

        # Menghitung offset untuk pagination
        if pagination:
            offset = (page - 1) * limit
            users_to_return = filtered_users[offset : offset + limit]  # noqa
        else:
            users_to_return = filtered_users

        # Mengurutkan hasil jika diminta
        if sort:
            users_to_return = apply_sort(users_to_return, sort, reverse=True)

        # Memilih kolom yang diminta
        if columns:
            selected_columns = columns.split("-")
            if "id" not in selected_columns:
                selected_columns.insert(
                    0, "id"
                )  # Memastikan kolom 'id' selalu di depan
            users_to_return = [
                {col: getattr(user, col) for col in selected_columns}
                for user in users_to_return
            ]

        total_row_in_page = len(users_to_return)
        total_records = len(filtered_users)

        return UserPaginationResponse(
            pagination=pagination,
            limit=limit,
            page=page,
            columns=columns,
            sort=sort,
            filter_by=filter_by,
            filter_value=filter_value,
            total_row_in_page=total_row_in_page,
            total_records=total_records,
            from_total=from_total,
            content=users_to_return,
        )
