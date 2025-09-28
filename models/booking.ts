import { LocBookingType } from "@/dataInterfaces";
import mongoose, { Schema } from "mongoose";

const bookingSchema:Schema<LocBookingType> = new Schema({
    location: mongoose.Schema.Types.ObjectId,
    user: {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    checkIn: {
        type: Date,
    }
}, { timestamps: true })

export default mongoose.models.Bookings ||
  mongoose.model<LocBookingType>("Bookings", bookingSchema);