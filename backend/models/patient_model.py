from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Patient(db.Model):
    _tablename_ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)  # Added column field securely
    biological_sex = db.Column(db.String(20), nullable=False)
    dob = db.Column(db.String(50), nullable=False)
    glucose = db.Column(db.Float, default=0.0)
    haemoglobin = db.Column(db.Float, default=0.0)
    cholesterol = db.Column(db.Float, default=0.0)