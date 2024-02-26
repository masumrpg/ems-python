import os
from pathlib import Path
from dotenv import load_dotenv
from urllib.parse import quote_plus, quote
from pydantic_settings import BaseSettings

env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)


class Settings(BaseSettings):
    # Database
    DB_USER: str = os.environ.get("POSTGRESQL_USER")
    DB_PASSWORD: str = os.environ.get("POSTGRESQL_PASSWORD")
    DB_NAME: str = os.environ.get("POSTGRESQL_DB")
    DB_HOST: str = os.environ.get("POSTGRESQL_HOST")
    DB_PORT: str = os.environ.get("POSTGRESQL_PORT")
    DATABASE_URL: str = (
        f"postgresql+psycopg2://{DB_USER}:%s@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        % quote_plus(DB_PASSWORD)
    )
    DATABASE_MIGRATION_URL: str = (
        f"postgresql+psycopg2://{DB_USER}:%s@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        % quote(DB_PASSWORD).replace("%", "%%")
    )

    # JWT
    JWT_SECRET: str = os.environ.get(
        "JWT_SECRET",
        "709d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",
    )
    JWT_ALGORITHM: str = os.environ.get("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = os.environ.get(
        "JWT_TOKEN_EXPIRE_MINUTES", 60
    )  # ignore


def get_settings() -> Settings:
    return Settings()
