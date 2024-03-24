from datetime import datetime
from fastapi import Request, logger, status
from sqlalchemy.orm import aliased, Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi.exceptions import HTTPException
from api.user.models import AddressModel, UserDetailModel, UserModel
from api.core.security import get_password_hash
from api.core.database import commit_rollback
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.responses import (
    AddressResponse,
    UserDetailResponse,
    UserPaginationResponse,
    UserWithDetilResponse,
)
import math
from sqlalchemy import or_, text, func, column
from sqlalchemy.sql import select


def convert_sort(sort):
    """
    # separate string using split('-')
    split_sort = sort.split('-')
    # join to list with ','
    new_sort = ','.join(split_sort)
    """
    return ",".join(sort.split("-"))


def convert_columns(columns):
    """
    # seperate string using split ('-')
    new_columns = columns.split('-')

    # add to list with column format
    column_list = []
    for data in new_columns:
        column_list.append(data)

    # we use lambda function to make code simple

    """

    return list(map(lambda x: column(x), columns.split("-")))


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
    # @staticmethod
    # def get_all_user(
    #     db: Session,
    #     page: int = 1,
    #     limit: int = 10,
    #     columns: str = None,
    #     sort: str = None,
    #     filter: str = None,
    # ):
    #     # query = select(from_obj=UserModel, columns="*")
    #     query = select(from_obj=UserModel, columns="*")

    #     # select columns dynamically
    #     if columns is not None and columns != "all":
    #         # we need column format data like this --> [column(id),column(name),column(sex)...]

    #         query = select(from_obj=UserModel, columns=convert_columns(columns))

    #     # select filter dynamically
    #     if filter is not None and filter != "null":
    #         # we need filter format data like this  --> {'name': 'an','country':'an'}

    #         # convert string to dict format
    #         criteria = dict(x.split("*") for x in filter.split("-"))

    #         criteria_list = []

    #         # check every key in dict. are there any table attributes that are the same as the dict key ?

    #         for attr, value in criteria.items():
    #             _attr = getattr(UserModel, attr)

    #             # filter format
    #             search = "%{}%".format(value)

    #             # criteria list
    #             criteria_list.append(_attr.like(search))

    #         query = query.filter(or_(*criteria_list))

    #     # select sort dynamically
    #     if sort is not None and sort != "null":
    #         # we need sort format data like this --> ['id','name']
    #         query = query.order_by(text(convert_sort(sort)))

    #     # count query
    #     count_query = select(func.count(1)).select_from(query)

    #     offset_page = page - 1
    #     # pagination
    #     query = query.offset(offset_page * limit).limit(limit)

    #     # total record
    #     total_record = (db.execute(count_query)).scalar() or 0

    #     # total page
    #     total_page = math.ceil(total_record / limit)

    #     # result
    #     results = (db.execute(query)).fetchall()

    #     # Ubah setiap baris (row) menjadi dictionary
    #     serialized_results = [dict(row) for row in results]

    #     return UserPaginationResponse(
    #         page_number=page,
    #         page_size=limit,
    #         total_pages=total_page,
    #         total_record=total_record,
    #         content=serialized_results,
    #     )

    @staticmethod
    def get_all_user(
        db: Session,
        page: int = 1,
        limit: int = 10,
        columns: str = None,
        sort: str = None,
        filter: str = None,
    ):
        query = select(UserModel)

        # select columns dynamically
        if columns is not None and columns != "all":
            # we need column format data like this --> [column(id),column(name),column(sex)...]

            query = select(UserModel, columns=convert_columns(columns))

        # # select filter dynamically
        if filter is not None and filter != "null":
            # we need filter format data like this  --> {'name': 'an','country':'an'}

            # convert string to dict format
            criteria = dict(x.split("*") for x in filter.split("-"))

            criteria_list = []

            # check every key in dict. are there any table attributes that are the same as the dict key ?

            for attr, value in criteria.items():
                _attr = getattr(UserModel, attr)

                # filter format
                search = "%{}%".format(value)

                # criteria list
                criteria_list.append(_attr.like(search))

            query = query.filter(or_(*criteria_list))

        # select sort dynamically
        if sort is not None and sort != "null":
            # we need sort format data like this --> ['id','name']
            query = query.order_by(text(convert_sort(sort)))

        # count query
        count_query = select(func.count()).select_from(query)

        offset_page = page - 1
        # pagination
        query = query.offset(offset_page * limit).limit(limit)

        # total record
        total_record = (db.execute(count_query)).scalar() or 0

        # total page
        total_page = math.ceil(total_record / limit)

        # result
        results = (db.execute(query)).fetchall()

        # Ubah setiap baris (row) menjadi dictionary
        serialized_results = [dict(row) for row in results]

        return UserPaginationResponse(
            page_number=page,
            page_size=limit,
            total_pages=total_page,
            total_record=total_record,
            content=serialized_results,
        )
