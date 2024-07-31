from flask import jsonify, request
from app.models.user import User
from app.services.user_services import delete_user, get_all_users
from app.constant import user_dict
from . import api_bp

@api_bp.route('/users', methods=['GET'])
def users():
    all_users = get_all_users()
    return jsonify({"data": [user_dict(user, "single") for user in all_users]})

@api_bp.route('/users/<user_id>', methods=['GET', 'DELETE'])
def user_route(user_id):
    user = User.query.filter_by(id=user_id).first()
    if request.method == 'GET':
        if not user:
            return jsonify({"message": "User not found"}), 404
        return jsonify(user_dict(user, "all"))
    else:
        if not user:
            return jsonify({"message": "User not found"}), 404
        delete_user(user_id)
        return jsonify({"message": "User deleted successfully"})