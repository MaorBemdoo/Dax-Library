from app.routes import main_bp
from flask import render_template

@main_bp.route('/')
@main_bp.route('/index')
def index():
    return render_template('index.html')