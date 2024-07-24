from app.models import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    content = db.Column(db.String())
    owner = db.relationship(db.ForeignKey)

    def __repr__(self):
        return f'{self}'