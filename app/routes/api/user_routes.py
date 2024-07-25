from flask import jsonify, request
from app.models.user import User
from app import db
from . import api_bp

@api_bp.route('/users', methods=['GET'])
def get_users():
    return "Users api"
    # users = User.query.all()
    # return jsonify(users)