from flask import json
from flask_login import UserMixin
from app import db
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(30), index=True, unique=True, nullable=False)
    password = db.Column(db.String(512))
    books = db.relationship('Book', backref='owner', lazy=True)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # def __repr__(self):
    #     user = {
    #         "id": self.id,
    #         "username": self.username,
    #         "full_name": self.full_name,
    #         "createdAt": f'{self.createdAt}',
    #         "updatedAt": f'{self.updatedAt}',
    #         "books": self.books
    #     }
    #     return json.dumps(user)