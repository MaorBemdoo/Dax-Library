from flask import jsonify, request
from app.models.user import User
from app import db
from . import api_bp
from app.services.auth_services import register as create_user
from werkzeug.security import check_password_hash
from flask_login import login_required, login_user, logout_user

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    full_name = data.get('full_name')
    password = data.get('password')
    if not username or not full_name or not password:
        return jsonify({'message': 'Username, Full Name and Password fields are required'}), 400
    if User.query.filter_by(username = username).first():
        return jsonify({'message': 'Username already exists'}), 409
    if len(password) <= 6:
        return jsonify({'message': "Password must me greater than 6 characters"}), 400
    create_user(username, full_name, password)
    return jsonify({'message': 'User created successfully'}), 201

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if not username or not password:
        return jsonify({'message': 'Username and Password fields are required'}), 400
    if not user:
        return jsonify({'message': 'Username does not exist'}), 400
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Incorrect password'}), 400
    try:
        login_user(user)
        return jsonify({'message': 'Logged in successfully'})
    except Exception as e:
        return jsonify({'message': 'Error Logging in', 'error': e.args}), 500

@api_bp.route('/logout')
@login_required
def logout():
    try:
        logout_user()
        return jsonify({'message': 'Logged out successfully'})
    except Exception as e:
        return jsonify({'message': 'Error logging out', 'error': e.args}), 500