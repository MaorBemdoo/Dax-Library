from flask import Blueprint

api_bp = Blueprint('api', __name__)

@api_bp.route("/")
def main():
    return "Welcome to Dax Library Api"

from . import user_routes, book_routes, auth_routes