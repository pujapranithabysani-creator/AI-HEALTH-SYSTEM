import sys
import os

# This adds the project root to the Python path so it can find the 'backend' package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask
from backend.models.patient_model import db
from backend.routes.patient_routes import patient_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(patient_bp)

@app.route('/')
def home():
    return {"status": "Backend is running"}

if __name__ == '__main__':
    app.run()