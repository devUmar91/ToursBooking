import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tours",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    people: {
        type: Number,
        required: true,
    },
    bill:{
        type:Number,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const BookingModel = mongoose.model("Bookings", BookingSchema);

export default BookingModel;
