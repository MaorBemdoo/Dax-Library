from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), index=True, unique=True, nullable=False)
    password = db.Column(db.String(512))
    books = db.relationship('Book', backref='owner', lazy=True)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'{self}'