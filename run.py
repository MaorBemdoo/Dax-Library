from app import create_app
from dotenv import get_key

app = create_app()

if __name__ == "__main__":
    app.run(debug=get_key(".env", "PYTHON_ENV") == "development", port=5000)