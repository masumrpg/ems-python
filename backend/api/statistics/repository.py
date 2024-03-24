from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.sql import select
from api.statistics.responses import StatisticsResponse
from api.user.models import UserModel


class StatisticRepository:
    @staticmethod
    def get_statistics(db: Session):
        # Membuat objek kueri untuk menghitung total record
        count_query = select(func.count()).select_from(UserModel)
        total_record = db.execute(count_query).scalar() or 0

        # Menghitung total pengguna aktif
        total_active_users = db.query(UserModel).filter_by(is_active=True).count()

        return StatisticsResponse(
            total_users=total_record,
            active_users=total_active_users
        )
