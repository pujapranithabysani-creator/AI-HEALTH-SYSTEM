import os
from flask import Flask, jsonify
from flask_cors import CORS
# Corrected import paths
from backend.models.patient_model import db
from backend.routes.patient_routes import patient_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # IMPORTANT: We use an environment variable for the database.
    # This prevents the app from crashing because it won't try to write a local file.
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///:memory:')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    app.register_blueprint(patient_bp, url_prefix='/api')
    
    @app.route('/')
    def home():
        return jsonify({"status": "Backend running successfully"}), 200
        
    return app

app = create_app()