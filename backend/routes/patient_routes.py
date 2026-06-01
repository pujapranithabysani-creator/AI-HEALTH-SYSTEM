from flask import Blueprint, request, jsonify
from models.patient_model import db, Patient

patient_bp = Blueprint('patient_bp', __name__)

# Updated route to match React's /api/patients
@patient_bp.route('/api/patients', methods=['POST'])
def add_patient():
    try:
        data = request.get_json()
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

# Updated route to match React's /api/patients
@patient_bp.route('/api/patients', methods=['GET'])
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

@patient_bp.route('/api/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({"error": "Patient record not found"}), 404
    db.session.delete(patient)
    db.session.commit()
    return jsonify({"message": "Patient deleted successfully"}), 200

@patient_bp.route('/api/patients/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    if not patient:
        return jsonify({"error": "Patient record not found"}), 404
    data = request.get_json()
    patient.name = data.get('name', patient.name)
    patient.email = data.get('email', patient.email)
    patient.glucose = float(data.get('glucose', patient.glucose))
    patient.haemoglobin = float(data.get('haemoglobin', patient.haemoglobin))
    patient.cholesterol = float(data.get('cholesterol', patient.cholesterol))
    db.session.commit()
    return jsonify({"message": "Patient updated successfully"}), 200