import { BookingPaymentType } from "@/dataInterfaces";
import mongoose, { Schema, Types } from "mongoose";

const PaymentSchema: Schema<BookingPaymentType> = new Schema(
  {
    userId:{
        type:Types.ObjectId,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
     receiptNo: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:['SUCCESS','PENDING','FAILED'],
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<BookingPaymentType>("Payment", PaymentSchema);
