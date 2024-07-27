from flask import jsonify
from app.services.user_services import get_all_users
from . import api_bp

@api_bp.route('/users', methods=['GET'])
def users():
    return get_all_users()