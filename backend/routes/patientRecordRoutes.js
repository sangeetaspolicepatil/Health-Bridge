import express from 'express';
import { addPatientRecord, getUserById, searchRecords, getMyRecords, allPatientRecords, downloadPatientRecordPDF, getMyPatientsRecords } from '../controllers/patientRecordController.js';
import authDoctor from '../middlewares/authDoctor.js';
import authUser from '../middlewares/authUser.js';
import authAdmin from '../middlewares/authAdmin.js';

const router = express.Router();

// Add new record
router.post('/add-record', authDoctor, addPatientRecord);

// Get user info for form
router.get('/user/:userId', authDoctor, getUserById);

// Search records
router.get('/search', authDoctor, searchRecords);
// NEW: My Patients Records (Doctor)
router.get('/my-patients-records', authDoctor, getMyPatientsRecords);

// Get logged-in user's own records (User)
router.get('/my-records', authUser, getMyRecords);

// Admin: View all records
router.get('/admin-patient-records', authAdmin, allPatientRecords);

// Admin: Download PDF
router.get('/admin-patient-records/download/:recordId', authAdmin, downloadPatientRecordPDF);

export default router;
