from datetime import datetime
from app.models import User
from app import db

def get_all_users():
    try:
        return db.session.query(User).all()
    except Exception as e:
        raise e

def delete_user(user_id):
    try:
        user = db.session.query(User).filter_by(id=user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
        return user
    except Exception as e:
        db.session.rollback()
        raise e
