import express from 'express'
import {
    addDoctor,
    adminDashboard,
    allDoctors,
    appointmentCancel,
    appointmentsAdmin,
    loginAdmin,
    allEmergencyBeds,
    completeEmergencyBed,
    cancelEmergencyBedAdmin
} from '../controllers/adminController.js'

import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

// Doctor management
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

// Appointments
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

// Emergency beds
adminRouter.get("/emergency-beds", authAdmin, allEmergencyBeds) // list all
adminRouter.post("/emergency-bed-complete", authAdmin, completeEmergencyBed) // mark completed
adminRouter.post("/emergency-bed-cancel", authAdmin, cancelEmergencyBedAdmin) // optional: cancel by admin

export default adminRouter
