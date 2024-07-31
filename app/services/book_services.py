from datetime import datetime
from app import db
from app.models import Book

def create_book(title, author, content, user_id):
    new_book = Book(title=title, author=author, content=content, user_id=user_id)
    db.session.add(new_book)
    db.session.commit()
    db.session.refresh(new_book)
    return new_book

def get_all_books(q=None):
    query = db.session.query(Book)
    if q:
        search = f"%{q}%"
        query = query.filter(
            (Book.title.ilike(search)) |
            (Book.author.ilike(search)) |
            (Book.content.ilike(search))
        )
    return query.all()

def get_book(book_id):
    return db.session.query(Book).get(book_id)

def update_book(book_id, title=None, author=None, content=None):
    book = get_book(book_id)
    if not book:
        return None
    
    if title:
        book.title = title
    if author:
        book.author = author
    if content:
        book.content = content
    
    book.updatedAt = datetime.now()
    db.session.commit()
    return book

def delete_book(book_id):
    book = get_book(book_id)
    if not book:
        return None
    
    db.session.delete(book)
    db.session.commit()
    return book
