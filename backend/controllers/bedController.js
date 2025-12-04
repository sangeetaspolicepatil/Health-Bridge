import mongoose from "mongoose";
import BedModel from "../models/bedModel.js";

const BED_LIMITS = {
    General: 2,
    ICU: 1,
    VIP: 1
};

// CHECK AVAILABILITY
const checkAvailability = async (req, res) => {
    try {
        const availability = {};

        for (const type of Object.keys(BED_LIMITS)) {
            const active = await BedModel.countDocuments({
                bedType: type,
                cancelled: false,
                completed: false
            });

            availability[type] = BED_LIMITS[type] - active;
        }

        res.json({ success: true, availability });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const payAndBook = async (req, res) => {
    try {
        const { bedType, date, time, amount } = req.body;
        const userId = req.userId;

        // Check availability (only completed bookings count)
        const active = await BedModel.countDocuments({
            bedType,
            completed: true,
            cancelled: false
        });

        if (active >= BED_LIMITS[bedType]) {
            return res.json({ success: false, message: `${bedType} bed is full` });
        }

        const booking = await BedModel.create({
            userId,
            bedType,
            date: new Date(date),
            time,
            amount,
            completed: true // paid and booked
        });

        return res.json({ success: true, booking, message: "Payment successful and bed booked!" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

// LIST USER BEDS
const listBeds = async (req, res) => {
    try {
        const userId = req.userId;

        const bookings = await BedModel.find({ userId })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// CANCEL USER BED
const cancelBed = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.userId;

        const booking = await BedModel.findById(bookingId);
        if (!booking) return res.json({ success: false, message: "Booking not found" });

        if (booking.userId.toString() !== userId) {
            return res.json({ success: false, message: "Not authorized" });
        }

        booking.cancelled = true;
        await booking.save();

        res.json({ success: true, message: "Bed cancelled" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export { checkAvailability, payAndBook, listBeds, cancelBed };
