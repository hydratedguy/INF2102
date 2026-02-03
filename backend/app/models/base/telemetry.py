import datetime

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column


class TelemetryModel:
    created_at: Mapped[datetime.datetime] = mapped_column(
        default=datetime.datetime.now,
        server_default=sa.func.current_timestamp(),
        nullable=False,
    )
