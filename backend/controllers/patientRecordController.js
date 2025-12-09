import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import patientRecordModel from '../models/patientRecordModel.js';
import userModel from '../models/userModel.js';

// -------------------- DOCTOR APIs --------------------

const addPatientRecord = async (req, res) => {
    try {
        const { userId, symptoms, diagnosis, prescription, notes } = req.body;
        const doctorId = req.docId;

        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: "User not found" });

        const doc = new PDFDocument();
        const fileName = `record-${userId}-${Date.now()}.pdf`;
        const filePath = path.join('uploads', fileName);

        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(20).text('Medical Record', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Patient: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Doctor ID: ${doctorId}`);
        doc.text(`Date: ${new Date().toLocaleString()}`);
        doc.moveDown();
        doc.text(`Symptoms: ${symptoms}`);
        doc.moveDown();
        doc.text(`Diagnosis: ${diagnosis}`);
        doc.moveDown();
        doc.text(`Prescription: ${prescription}`);
        doc.moveDown();
        doc.text(`Notes: ${notes}`);
        doc.end();

        const record = new patientRecordModel({
            userId: user._id,      // ObjectId of patient
            doctorId: doctorId,    // ObjectId of doctor
            patientName: user.name,
            patientEmail: user.email,
            symptoms,
            diagnosis,
            prescription,
            notes,
            pdfUrl: filePath
        });


        await record.save();
        res.json({ success: true, message: 'Record created', record });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to create record', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        if (!user) return res.json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const searchRecords = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search || search.trim() === '') {
            return res.json({ success: false, message: 'Please provide a search term' });
        }
        const regex = new RegExp(search, 'i');
        const records = await patientRecordModel.find({
            $or: [
                { patientName: regex },
                { patientEmail: regex }
            ]
        })
            .populate('doctorId', 'name email')  // <-- populate doctor info
            .sort({ createdAt: -1 });

        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// -------------------- DOCTOR: My Patients Records --------------------
const getMyPatientsRecords = async (req, res) => {
    try {
        const doctorId = req.docId; // doctor ID from authDoctor middleware

        const records = await patientRecordModel
            .find({ doctorId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//--------------------Users-------------
const getMyRecords = async (req, res) => {
    try {
        const userId = req.userId;

        const records = await patientRecordModel
            .find({ userId })
            .populate('doctorId', 'name email') // ⬅ Add this
            .sort({ createdAt: -1 });

        res.json({ success: true, records });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// -------------------- ADMIN APIs --------------------

const allPatientRecords = async (req, res) => {
    try {
        const records = await patientRecordModel.find({})
            .populate('userId', 'name email')
            .populate('doctorId', 'name email');
        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const downloadPatientRecordPDF = async (req, res) => {
    try {
        const { recordId } = req.params;
        const record = await patientRecordModel.findById(recordId);
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });

        const filePath = path.resolve(record.pdfUrl);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'PDF file not found' });
        }
        res.download(filePath);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- EXPORT ALL --------------------
export {
    addPatientRecord,
    getUserById,
    searchRecords,
    getMyRecords,
    allPatientRecords,
    downloadPatientRecordPDF,
    getMyPatientsRecords
};
