import mongoose,{ Schema } from 'mongoose'


const otpSchema = new Schema({
    email :String,
    otp: String,
    createdAt:{
        type: Date,
        expires:60,
        default: Date.now
    }
})

export const OtpModel = mongoose.model('OTP',otpSchema)