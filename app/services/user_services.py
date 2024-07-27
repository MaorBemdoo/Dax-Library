from app.models import User
from app import db

def get_all_users():
    try:
        return db.session.query()
    finally:
        db.session.close()

def get_user(user_id):
    try:
        return db.session.query(User).filter(User.id == user_id).first()
    finally:
        db.session.close()

def update_user(user_id, username = None, full_name = None):
    try:
        user = db.session.query(User).filter(User.id == user_id).first()
        if user:
            if username:
                user.username = username
            if full_name:
                user.full_name = full_name
            db.session.commit()
            db.session.refresh(user)
        return user
    finally:
        db.session.close()

def delete_user(user_id):
    try:
        user = db.session.query(User).filter(User.id == user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
        return user
    finally:
        db.session.close()
