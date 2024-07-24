from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from app.models import user
from app.models import book