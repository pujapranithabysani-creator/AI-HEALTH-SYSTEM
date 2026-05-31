from flask import Blueprint
from backend.models.patient_model import db, Patient

patient_bp = Blueprint('patient_bp', __name__)

# --- VALIDATION HELPER ---
def validate_patient_data(data):
    try:
        email = data.get('email', '')
        if not email or "@" not in email or "." not in email:
            return "Invalid email format"
        
        glucose = float(data.get('glucose', 0))
        haemoglobin = float(data.get('haemoglobin', 0))
        cholesterol = float(data.get('cholesterol', 0))
        
        if glucose < 0 or haemoglobin < 0 or cholesterol < 0:
            return "Biomarker values cannot be negative"
            
        return None  # No error
    except (ValueError, TypeError):
        return "Biomarker values must be valid numbers"

@patient_bp.route('/patients', methods=['POST'])
def add_patient():
    data = request.get_json()
    
    # Apply Validation
    error = validate_patient_data(data)
    if error:
        return jsonify({"error": error}), 400

    try:
        new_patient = Patient(
            name=data.get('name'),
            email=data.get('email'),
            biological_sex=data.get('biological_sex'),
            dob=data.get('dob'),
            glucose=float(data.get('glucose', 0)),
            haemoglobin=float(data.get('haemoglobin', 0)),
            cholesterol=float(data.get('cholesterol', 0))
        )
        db.session.add(new_patient)
        db.session.commit()
        return jsonify({"message": "Patient recorded successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@patient_bp.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    output = []
    for p in patients:
        output.append({
            "id": p.id,
            "name": p.name,
            "email": p.email,
            "biological_sex": p.biological_sex,
            "dob": p.dob,
            "glucose": p.glucose,
            "haemoglobin": p.haemoglobin,
            "cholesterol": p.cholesterol
        })
    return jsonify(output), 200

@patient_bp.route('/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({"error": "Patient record not found"}), 404
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted successfully"}), 200

@patient_bp.route('/patients/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({"error": "Patient record not found"}), 404
    
    data = request.get_json()
    
    # Apply Validation
    error = validate_patient_data(data)
    if error:
        return jsonify({"error": error}), 400

    patient.name = data.get('name', patient.name)
    patient.email = data.get('email', patient.email)
    patient.glucose = float(data.get('glucose', patient.glucose))
    patient.haemoglobin = float(data.get('haemoglobin', patient.haemoglobin))
    patient.cholesterol = float(data.get('cholesterol', patient.cholesterol))
    db.session.commit()
    return jsonify({"message": "Patient updated successfully"}), 200