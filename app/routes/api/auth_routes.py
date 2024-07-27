from flask import jsonify, request
from app.models.user import User
from app import db
from . import api_bp
from app.services.auth_services import register as create_user

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    full_name = data.get('full_name')
    password = data.get('password')
    if not username or not full_name or not password:
        return jsonify({'message': 'Username, Full Name and Password fields are required'}), 400
    if User.query.filter(User.username == username).first():
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
    (username, password)
    return jsonify({'message': 'Logged in successfully'})