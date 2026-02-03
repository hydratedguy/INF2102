from typing import TypeVar

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import text

from app.models.base.base import BaseModel


class ClassifierModel(BaseModel):
    __abstract__ = True

    code: Mapped[str] = mapped_column(String(100), primary_key=True)
    description: Mapped[str] = mapped_column(
        String(), default='', server_default=text("''")
    )


TClassifierModel = TypeVar('TClassifierModel', bound=ClassifierModel)