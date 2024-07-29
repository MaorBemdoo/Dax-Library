from app.models.user import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user

def register(username, full_name, password):
    try:
        password_hash = generate_password_hash(password)
        user = User(username=username, full_name=full_name, password=password_hash)
        db.session.add(user)
        db.session.commit()
        db.session.refresh(user)
        return user
    except Exception as e:
        db.session.rollback()
        raise e
    finally:
        db.session.close()

def login(username, password):
    try:
        user = db.session.query(User).filter_by(username=username).first()
        login_user(user)
    finally:
        db.session.close()