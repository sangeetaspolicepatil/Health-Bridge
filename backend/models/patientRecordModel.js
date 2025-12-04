import mongoose from "mongoose";
import userModel from '../models/userModel.js'; // assuming your User model file


const patientRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    symptoms: String,
    diagnosis: String,
    prescription: String,
    notes: String,
    pdfUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const patientRecordModel = mongoose.models.patientRecord || mongoose.model('patientRecord', patientRecordSchema);

export default patientRecordModel;
