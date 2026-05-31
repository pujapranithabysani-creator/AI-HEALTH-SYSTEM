import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.patient_model import db
from routes.patient_routes import patient_bp

def create_app():
    app = Flask(__name__)
    
    # Fully open cross-origin gateway communication channels for React
    CORS(app)
    
    # Configure SQLite Database path local directories
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'database.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Mount routing systems 
    app.register_blueprint(patient_bp, url_prefix='/api')
    
    @app.route('/')
    def home():
        return jsonify({"status": "Backend running perfectly", "api_endpoint": "/api/patients"}), 200
    
    # Build database instances automatically if missing
    with app.app_context():
        os.makedirs(os.path.join(BASE_DIR, 'database'), exist_ok=True)
        db.create_all()
        
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)