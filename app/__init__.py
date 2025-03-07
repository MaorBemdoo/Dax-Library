from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from app.routes import main_bp
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        from .models import User, Book
        db.create_all()

        
        @login_manager.user_loader
        def load_user(user_id):
            return User.query.get(int(user_id))

        from .routes.api import api_bp
        app.register_blueprint(api_bp, url_prefix='/api')
        app.register_blueprint(main_bp)

    return app

from app.routes import main_routes