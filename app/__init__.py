from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.routes import main_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        from .models import User, Book
        db.create_all()

        app.register_blueprint(main_bp)
        from .routes.api import api_bp
        app.register_blueprint(api_bp, url_prefix='/api')

    return app


from app.routes import main_routes