import os
from app.routes import main_bp
from flask import redirect, render_template, send_from_directory

def get_ext(filename):
    if filename.__contains__(".css"):
        return "css"
    elif filename.__contains__(".js"):
        return "js"
    else:
        return "img"

def server_static(filename):
    filepath = os.path.join(main_bp.root_path[:-6], "static", get_ext(filename), filename)
    if os.path.isfile(filepath):
        return send_from_directory(filepath.strip(filename), filename)
    else:
        return "404 Not Found", 404

def serve_template(filename):
    filepath = os.path.join(main_bp.root_path[:-6], 'templates', filename + '.html')
    if os.path.isfile(filepath):
        return render_template(filename + '.html')
    else:
        return "404 Not Found", 404

@main_bp.route('/<path:filename>')
def main(filename):
    if filename.__contains__(".html") or not filename.__contains__("."):
        serve_template(filename)
    else:
        server_static(filename)