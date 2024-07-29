from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.routes import main_bp
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)

    with app.app_context():
        from .models import User, Book
        db.create_all()

        from .routes.api import api_bp
        app.register_blueprint(api_bp, url_prefix='/api')
        app.register_blueprint(main_bp)

    return app

@login_manager.user_loader
def load_user(user_id):
    return db.query().get(int(user_id))

from app.routes import main_routes