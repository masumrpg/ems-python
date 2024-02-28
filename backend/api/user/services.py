from fastapi import Request, logger, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session, aliased
from sqlalchemy.exc import SQLAlchemyError
from api.user.models import AddressModel, UserDetailModel, UserModel
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.responses import (
    AddressResponse,
    UserDetailResponse,
    UserResponse,
    UserWithDetilResponse,
)
from datetime import datetime
from api.core.security import get_password_hash
from fastapi.exceptions import HTTPException


async def create_user_account_services(data: CreateUserRequest, db: Session):
    username = db.query(UserModel).filter(UserModel.username == data.username).first()

    if username:
        # Jika pengguna dengan username dan email yang sama sudah ada, lemparkan HTTPException
        raise HTTPException(status_code=409, detail="Username already exists")

    email = db.query(UserModel).filter(UserModel.email == data.email).first()

    if email:
        # Jika pengguna dengan username dan email yang sama sudah ada, lemparkan HTTPException
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
    db.commit()
    db.refresh(new_user)
    return JSONResponse(
        content={"message": "User account has been succesfully created."}
    )


async def create_user_detail_services(
    data: CreateUserDetailRequest, request: Request, db: Session
):
    user_id = request.user.id
    db_user_detail: UserDetailModel = (
        db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first()
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
        user_id=user_id,
    )
    db.add(new_user_detail)
    db.commit()
    db.refresh(new_user_detail)

    db_user_detail_new: UserDetailModel = (
        db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first()
    )

    if db_user_detail_new is None:
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
    db.commit()
    db.refresh(new_detail_address)

    if new_detail_address is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong",
        )

    return JSONResponse(
        content={"message": "User detail has been succesfully created."}
    )


async def create_user_detail_by_id_services(
    data: CreateUserDetailRequest, user_id: str, db: Session
):
    db_user: UserModel = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )

    db_user_detail: UserDetailModel = (
        db.query(UserDetailModel).filter(UserDetailModel.user_id == db_user.id).first()
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
        db.query(UserDetailModel).filter(UserDetailModel.user_id == db_user.id).first()
    )

    if db_user_detail_new is None:
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
    db.commit()
    db.refresh(new_detail_address)

    if new_detail_address is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong",
        )

    return JSONResponse(
        content={"message": "User detail has been succesfully created."}
    )


async def get_all_user_services(db: Session):

    try:
        all_users_details = (
            db.query(UserModel).all()
        )
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to query users: {str(e)}")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )

    # Give response 404
    if not all_users_details:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No users found"
        )

    user_responses = []

    for user_data in all_users_details:
        user_response = UserResponse(
            id=user_data.id,
            username=user_data.username,
            email=user_data.email,
            full_name=user_data.full_name,
            is_active=user_data.is_active,
            is_superuser=user_data.is_superuser,
            is_verified=user_data.is_verified,
            verified_at=user_data.verified_at,
            created_at=user_data.created_at,
        )
        user_responses.append(user_response)

    return user_responses


async def get_me_by_id_services(user_id: str, db: Session):
    db_user: UserModel = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    user_response = UserResponse(
        id=db_user.id,
        username=db_user.username,
        email=db_user.email,
        full_name=db_user.full_name,
        is_active=db_user.is_active,
        is_superuser=db_user.is_superuser,
        is_verified=db_user.is_verified,
        verified_at=str(db_user.verified_at) if db_user.verified_at else None,
        created_at=str(db_user.created_at)
    )

    if user_response is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error"
        )

    return user_response


async def get_user_by_id_services(user_id: str, db: Session):
    db_user: UserModel = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    db_user_detail: UserDetailModel = (
        db.query(UserDetailModel).filter(UserDetailModel.user_id == db_user.id).first()
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


async def update_user_detail_services(
    data: CreateUserDetailRequest, request: Request, db: Session
):
    user_id = request.user.id
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
    if db_user_address is None:
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

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to query users: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user detail. Please try again.",
        )

    return JSONResponse(
        content={"message": "User detail has been successfully updated."}
    )


async def update_user_detail_by_id_services(
    data: CreateUserDetailRequest, user_id: str, db: Session
):
    db_user_detail: UserDetailModel = (
        db.query(UserDetailModel).filter(UserDetailModel.user_id == user_id).first()
    )
    if db_user_detail is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User detail not found."
        )

    db_user_address: AddressModel = (
        db.query(AddressModel)
        .filter(AddressModel.user_detail_id == db_user_detail.user_detail_id)
        .first()
    )
    if db_user_address is None:
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

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to query users: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user detail. Please try again.",
        )

    return JSONResponse(
        content={"message": "User detail has been successfully updated."}
    )


async def delete_user_by_id_services(user_id: str, db: Session):
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

    return JSONResponse(
        content={"message": f"{user.full_name} has been succesfully deleted."}
    )
