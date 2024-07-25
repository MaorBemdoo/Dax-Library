from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.routes import main_bp, auth_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    @app.route('/<filename>')
    def serve_static(filename):
        def get_ext(filename):
            if filename.__contains__("css"):
                return "css"
            elif filename.__contains__("js"):
                return "js"
            else:
                return "img"
        return send_from_directory("static/", f'{get_ext(filename)}/{filename}')

    with app.app_context():
        from .models import User, Book
        db.create_all()

        app.register_blueprint(main_bp)
        app.register_blueprint(auth_bp, url_prefix='/auth')
        from .routes.api import api_bp
        app.register_blueprint(api_bp, url_prefix='/api')

    return app


from app.routes import main_routes, auth_routes