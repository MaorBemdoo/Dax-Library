def user_dict(user): 
    return {
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "createdAt": f'{user.createdAt}',
        "updatedAt": f'{user.updatedAt}',
        "books": user.books
    }