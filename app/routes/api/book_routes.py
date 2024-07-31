from flask import jsonify, request
from app.models.book import Book
from app import db
from app.models.user import User
from constant import book_dict
from . import api_bp
from app.services.book_services import (
    create_book,
    get_all_books,
    get_book,
    update_book,
    delete_book
)

@api_bp.route('/books', methods=['GET', 'POST'])
def books_routes():
    if request.method == "GET":
        q = request.args.get('q')
        books = get_all_books(q)
        return jsonify({"data": [book_dict(book) for book in books]}), 200
    else:
        data = request.json
        title = data.get('title')
        author = data.get('author')
        content = data.get('content')
        user_id = data.get('user_id')
        if not title or not author or not content or not user_id:
            return jsonify({'message': 'Title, Author, User ID and Content fields are required'}), 400
        if Book.query.filter_by(content = content).first():
            return jsonify({'message': 'Content already exists'}), 409
        if not User.query.get(int(user_id)):
            return jsonify({'message': 'No User with this user_id exist'}), 400
        create_book(title, author, content, user_id)
        return jsonify({'message': 'Book created successfully'}), 201

@api_bp.route('/books/<int:book_id>', methods=['GET', 'PUT', 'DELETE'])
def book_route(book_id):
    if request.method == "GET":
        book = get_book(book_id)
        if not book:
            return jsonify({'message': 'Book not found'}), 404
        return jsonify(book_dict(book)), 200
    elif request.method == "PUT":
        data = request.json
        title = data.get('title')
        author = data.get('author')
        content = data.get('content')
        if not title and not author and not content:
            return jsonify({'message': 'Title, author or content are required'}), 400
        if Book.query.filter_by(content = content).first():
            return jsonify({'message': 'Content already exists'}), 409
        updated_book = update_book(book_id, title, author, content)
        if not updated_book:
            return jsonify({'message': 'Book not found'}), 404
        return jsonify({'message': 'Book updated successfully'}), 200
    else:
        deleted_book = delete_book(book_id)
        if not deleted_book:
            return jsonify({'message': 'Book not found'}), 404
        return jsonify({'message': 'Book deleted successfully'}), 200