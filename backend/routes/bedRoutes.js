import express from "express";
import { checkAvailability, payAndBook, listBeds, cancelBed, adminAllBeds, adminCompleteBed, adminCancelBed } from "../controllers/bedController.js";
import authUser from "../middlewares/authUser.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

// Availability: returns remaining slots per type (strict, across all dates)
router.get("/availability", authUser, checkAvailability);

// Book (strict)
router.post("/pay-and-book", authUser, payAndBook);

// Cancel
router.post("/cancel", authUser, cancelBed);

// My bookings
router.get("/my-bookings", authUser, listBeds);

// ADMIN ROUTES
router.get("/admin/all", authAdmin, adminAllBeds);
router.post("/admin/complete", authAdmin, adminCompleteBed);
router.post("/admin/cancel", authAdmin, adminCancelBed);




export default router;
