from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from api.core.security import is_superuser, oauth2_scheme
from api.core.database import get_db
from api.statistic.repository import StatisticRepository
from api.statistic.responses import StatisticsResponse


public_statistics_router = APIRouter(
    prefix="/statistic",
    tags=["Public Statistics Api"],
    responses={404: {"description": "Not found"}},
)

user_statistics_router = APIRouter(
    prefix="/statistic",
    tags=["User Statistics Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)],
)


admin_statistics_router = APIRouter(
    prefix="/statistic",
    tags=["Admin Statistics Api"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme), Depends(is_superuser)],
)


@admin_statistics_router.get("", status_code=status.HTTP_200_OK, response_model=StatisticsResponse)
def get_statistics(db: Session = Depends(get_db)):
    result = StatisticRepository.get_statistics(db)
    return result
