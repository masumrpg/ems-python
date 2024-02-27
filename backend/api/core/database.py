from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import Generator
from api.core.config import get_settings

settings = get_settings()

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,  # Daur ulang setiap 5 menit
    pool_size=10,  # Batasi jumlah koneksi dalam pool
    max_overflow=10,  # Batas overflow 10 koneksi
    pool_timeout=30,  # Timeout 30 detik untuk memperoleh koneksi
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
