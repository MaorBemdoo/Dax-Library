from flask import jsonify, request
from app.models.book import Book
from app import db
from . import api_bp

@api_bp.route('books/', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify(books)