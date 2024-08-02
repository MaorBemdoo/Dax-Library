import os
from app.routes import main_bp
from flask import redirect, render_template, send_from_directory
from flask_login import current_user

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
    filename = filename.removesuffix(".html")
    filepath = os.path.join(main_bp.root_path[:-6], 'templates', filename + '.html')
    if os.path.isdir(filepath.removesuffix(".html")) or not filename:
        return render_template(filename + "/index.html")
    elif os.path.isfile(filepath):
        if filename.endswith('index'):
            if filename == "index":
                return redirect("/" + filename.removesuffix("index"))
            else: 
                return redirect(filename.removesuffix("index"))
        else:
            return render_template(filename + '.html')
    else:
        return render_template("404.html"), 404

@main_bp.route("/")
def home_page():
    if current_user.is_authenticated:
        return render_template("/index.html", current_user=current_user)
    return redirect("/login")

@main_bp.route('/<path:filename>')
def main(filename):
    if filename.__contains__(".html") or not filename.__contains__("."):
        return serve_template(filename)
    else:
        return server_static(filename)