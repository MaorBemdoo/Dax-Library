from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from app.models import user, book
from .user import User
from .book import Book