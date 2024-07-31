def book_dict(book): 
    return {
        "id": book.id,
        "author": book.author,
        "title": book.title,
        "content": book.content,
        "createdAt": f'{book.createdAt}',
        "updatedAt": f'{book.updatedAt}',
        "user_id": book.user_id
    }

def user_dict(user): 
    return {
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "createdAt": f'{user.createdAt}',
        "updatedAt": f'{user.updatedAt}',
        "books": [book_dict(book) for book in user.books]
    }
