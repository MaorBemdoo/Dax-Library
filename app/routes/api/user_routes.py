from flask import jsonify, request
from app.models.user import User
from app import db
from app.services.user_services import create_user
from . import api_bp

@api_bp.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        full_name = data.get('full_name')
        password = data.get('password')
        create_user(username, full_name, password)
        return jsonify({'message': 'User created successfully'}), 201
    else:
        users = User.query.all()
        return jsonify(users)