from fastapi import APIRouter, status, Depends, Header
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from api.auth.responses import TokenResponse
from api.core.database import get_db
from api.auth.services import get_token, get_refresh_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/token", status_code=status.HTTP_200_OK, response_model=TokenResponse)
async def authenticate_user(
    data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    return await get_token(data=data, db=db)


@router.post("/refresh", status_code=status.HTTP_200_OK, response_model=TokenResponse)
async def refresh_access_token(
    refresh_token: str = Header(), db: Session = Depends(get_db)
):
    return await get_refresh_token(token=refresh_token, db=db)
