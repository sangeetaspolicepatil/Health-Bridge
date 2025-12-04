import express from "express";
import { checkAvailability, payAndBook, listBeds, cancelBed } from "../controllers/bedController.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

// Availability: returns remaining slots per type (strict, across all dates)
router.get("/availability", authUser, checkAvailability);

// Book (strict)
router.post("/pay-and-book", authUser, payAndBook);

// Cancel
router.post("/cancel", authUser, cancelBed);

// My bookings
router.get("/my-bookings", authUser, listBeds);




export default router;
