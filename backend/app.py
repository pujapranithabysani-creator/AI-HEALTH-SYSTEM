from flask import Flask, jsonify
from flask_cors import CORS
sys.path.append(os.getcwd())
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from models.patient_model import db
from routes.patient_routes import patient_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Use an in-memory database to avoid Vercel file-system crashes
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    app.register_blueprint(patient_bp, url_prefix='/api')
    
    @app.route('/')
    def home():
        return jsonify({"status": "Backend is running"}), 200
        
    return app

app = create_app()