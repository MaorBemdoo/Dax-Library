from app.models import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    books = db.relationship('Book', backref='owner', lazy=True)

    def __repr__(self):
        return f'{self}'