# from datetime import datetime
from fastapi import Request
from sqlalchemy.orm import Session
from api.user.schemas import CreateUserDetailRequest, CreateUserRequest
from api.user.repository import UserRepository


class PublicService:
    @staticmethod
    def create_user_service(data: CreateUserRequest, db: Session):
        UserRepository.create_user(data, db)


class UserService:
    @staticmethod
    def create_user_detail_service(
        data: CreateUserDetailRequest, request: Request, db: Session
    ):
        UserRepository.create_user_detail_by_me(data, request, db)

    @staticmethod
    def get_me_by_req_service(user_id: str, db: Session):
        user = UserRepository.get_user_by_id(user_id, db)
        return user

    @staticmethod
    def update_user_detail_service(
        data: CreateUserDetailRequest, user_id: str, db: Session
    ):
        UserRepository.update_user_detail_by_id(data, user_id, db)


class AdminService:
    @staticmethod
    def create_user_detail_by_id_service(
        data: CreateUserDetailRequest, user_id: str, db: Session
    ):
        UserRepository.create_user_detail_by_id(data, user_id, db)

    @staticmethod
    def get_all_user_service(db: Session):
        users = UserRepository.get_all_user(db)
        return users

    @staticmethod
    def get_user_by_id_service(user_id: str, db: Session):
        user = UserRepository.get_user_by_id(user_id, db)
        return user

    @staticmethod
    def update_user_detail_by_id_service(
        data: CreateUserDetailRequest, user_id: str, db: Session
    ):
        UserRepository.update_user_detail_by_id(data, user_id, db)

    @staticmethod
    def delete_user_by_id_service(user_id: str, db: Session):
        UserRepository.delete_user_by_id(user_id, db)
