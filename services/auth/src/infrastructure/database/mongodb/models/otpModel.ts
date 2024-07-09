import mongoose,{ Schema } from 'mongoose'


const otpSchema = new Schema({
    email :String,
    otp: Number,
    createdAt:{
        type: Date,
        expires:120,
        default: Date.now
    }
})

export const OtpModel = mongoose.model('OTP',otpSchema)