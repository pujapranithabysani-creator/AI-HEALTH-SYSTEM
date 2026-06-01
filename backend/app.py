from flask import Flask, jsonify, request
from flask_cors import CORS  # <-- You need this
from models.patient_model import db
from routes.patient_routes import patient_bp

app = Flask(__name__)
# THIS LINE IS CRITICAL: It allows your React app to talk to the backend
CORS(app, resources={r"/*": {"origins": "*"}})

import os
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'patients.db')
db.init_app(app)

app.register_blueprint(patient_bp)

@app.route('/')
def home():
    return jsonify({"message": "Backend is running"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database file created/verified.")
    app.run(port=5000)