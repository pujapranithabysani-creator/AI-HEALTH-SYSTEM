import axios from 'axios';

const API_URL = "http://127.0.0.1:5000";

export const getPatients = () => {
    return axios.get(`${API_URL}/patients`);
};

export const addPatient = (patientData) => {
    return axios.post(`${API_URL}/patients`, patientData);
};

export const updatePatient = (id, patientData) => {
    return axios.put(`${API_URL}/patients/${id}`, patientData);
};

export const deletePatient = (id) => {
    return axios.delete(`${API_URL}/patients/${id}`);
};