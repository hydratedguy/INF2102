import datetime
from typing import Any, BinaryIO, TypeVar

from sqlalchemy import JSON, Date, DateTime, LargeBinary
from sqlalchemy.orm import DeclarativeBase


class BaseModel(DeclarativeBase):
    type_annotation_map = {
        dict[str, Any]: JSON,
        datetime.datetime: DateTime(timezone=True),
        datetime.date: Date,
        BinaryIO: LargeBinary,
    }


TBaseModel = TypeVar('TBaseModel', bound=BaseModel)