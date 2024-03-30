import uuid
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Date,
    func,
    orm,
)
from sqlalchemy.orm import relationship
from api.core.database import Base


class AddressModel(Base):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True)
    postal_code = Column(String)
    village = Column(String)
    subdistrict = Column(String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    user_detail_id = Column(
        Integer, ForeignKey("user_detail.user_detail_id"), nullable=False
    )


class UserDetailModel(Base):
    __tablename__ = "user_detail"

    user_detail_id = Column(Integer, primary_key=True)
    address = relationship("AddressModel", backref="user_detail")
    phone = Column(String)
    dob = Column(Date)
    gender = Column(String)
    marital_status = Column(String)
    id_card = Column(String)
    religion = Column(String)
    tertiary_education = Column(String)
    job = Column(String)
    salary = Column(Integer)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)


class UserModel(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, nullable=False, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(200), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    verified_at = Column(DateTime, nullable=True, default=None)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships
    user_detail = relationship("UserDetailModel", uselist=False, backref="user")
    attendance_records = relationship("AttendanceModel", back_populates="user")

    @orm.reconstructor
    def init_on_load(self):
        """Jika user_detail tidak None, set is_verified menjadi True"""
        if self.user_detail is not None:
            self.is_verified = True


class AttendanceModel(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    check_in = Column(DateTime, nullable=False, default=func.now())
    check_out = Column(DateTime)

    # Relationship with UserModel
    user = relationship("UserModel", back_populates="attendance_records")