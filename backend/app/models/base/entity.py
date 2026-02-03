import datetime
from typing import TypeVar
from uuid import UUID, uuid4

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base.base import BaseModel


class EntityModel(BaseModel):
    __abstract__ = True

    uuid: Mapped[UUID] = mapped_column(
        primary_key=True, default=uuid4, server_default=sa.func.gen_random_uuid()
    )

    updated_at: Mapped[datetime.datetime] = mapped_column(
        default=datetime.datetime.now,
        # NOTE: this auto update works on the ORM side, not the DB side,
        # so a direct insert/update SQL command won't update this column.
        onupdate=datetime.datetime.now,
        server_default=sa.func.current_timestamp(),
        nullable=False,
    )

    def get_props(self) -> dict[str, str]:
        return {
            key: str(value)
            for key, value in self.__dict__.items()
            if not key.startswith('_')
        }


TEntityModel = TypeVar('TEntityModel', bound=EntityModel)
