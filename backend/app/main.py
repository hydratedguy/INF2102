import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from starlette.middleware.sessions import SessionMiddleware

from app.api import plants, pontos_entrega, aterros_sanitarios, ecoparques, usinas_alcool, simulation
from app.db.session import engine
from app.admin import admin_views


app = FastAPI()

# Session middleware required for SQLAdmin authentication
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLAdmin setup (no authentication for now)
sqladmin = Admin(app, engine, title="SimBio Admin")

for view in admin_views:
    sqladmin.add_view(view)

routers = [
    plants.router,
    pontos_entrega.router,
    aterros_sanitarios.router,
    ecoparques.router,
    usinas_alcool.router,
    simulation.router,
]

for r in routers:
    app.include_router(r)
