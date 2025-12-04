import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


//api to register to user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })

        }
        if (!/^[A-Za-z ]+$/.test(name)) {
            return res.json({ success: false, message: "Name should contain only letters" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })

        }

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!strongPassword.test(password)) {
            return res.json({ success: false, message: "Password must include uppercase, lowercase, number & Minimum lenth of 8" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//api to update user profile

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            //upload image to clodinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to book appointment

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        // decode userId from JWT (auth middleware should set req.userId)
        const userId = req.userId;

        const { docId, slotDate, slotTime } = req.body;

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Fetch doctor
        let docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }

        // Initialize slots_booked if undefined
        let slots_booked = docData.slots_booked || {};

        // Check if slot is already booked
        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.json({ success: false, message: 'Slot not available' });
        }

        // Add slot to booked slots
        if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
        slots_booked[slotDate].push(slotTime);

        // Update doctor slots in DB
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Fetch user data
        const userData = await userModel.findById(userId).select('-password');

        // Create new appointment
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: new Date()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Return success with appointmentId
        res.json({
            success: true,
            message: 'Appointment booked successfully',
            appointmentId: newAppointment._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Dummy payment API
const dummyPay = async (req, res) => {
    try {
        const userId = req.userId; // from auth middleware
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        // Find the appointment
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Verify user
        if (appointment.userId !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        // Mark as paid
        appointment.payment = true;
        await appointment.save();

        res.json({ success: true, message: "Payment successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// const bookAppointment = async (req, res) => {
//     try {
//         // decode userId from JWT
//         const userId = req.userId; // authUser middleware must set req.userId

//         const { docId, slotDate, slotTime } = req.body;

//         if (!userId || !docId || !slotDate || !slotTime) {
//             return res.json({ success: false, message: "Missing details" });
//         }

//         let docData = await doctorModel.findById(docId).select('-password');
//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' });
//         }

//         let slots_booked = docData.slots_booked || {};

//         // Check slot availability
//         if (slots_booked[slotDate]?.includes(slotTime)) {
//             return res.json({ success: false, message: 'Slot not available' });
//         }

//         // Add slot to booked slots
//         if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
//         slots_booked[slotDate].push(slotTime);

//         const userData = (await userModel.findById(userId).select('-password')).toObject();
//         docData = docData.toObject();
//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Update doctor's booked slots
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: 'Appointment Booked' });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

//API to get User Appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing the doctor slots

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, dummyPay }