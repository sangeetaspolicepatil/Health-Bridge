import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    bedType: {
        type: String,
        required: true,
        enum: ["General", "ICU", "VIP"]
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    amount: { type: Number, required: true },

    status: {
        type: String,
        enum: ["booked", "completed", "cancelled"],
        default: "booked"
    }

}, { timestamps: true });

const BedModel = mongoose.models.beds || mongoose.model("beds", bedSchema);
export default BedModel;
