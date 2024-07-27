from flask import Blueprint

api_bp = Blueprint('api', __name__)

from . import user_routes, book_routes, auth_routes