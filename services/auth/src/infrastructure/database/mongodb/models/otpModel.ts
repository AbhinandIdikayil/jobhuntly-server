import { func } from 'joi'
import mongoose, { Schema } from 'mongoose'

interface IOtp extends Document {
    email: string,
    otp: number,
    createdAt: Date,
    extendExpiry(time: number): () => void
}

const otpSchema = new Schema<IOtp>({
    email: String,
    otp: Number,
    createdAt: {
        type: Date,
        expires: 120,
        default: Date.now
    }
})

otpSchema.methods.extendExpiry = function (additionalSeconds: number) {
    this.createdAt = new Date(this.createdAt.getTime() + additionalSeconds * 1000)
}

otpSchema.pre('save', function (next) {
    if (this.isModified('createdAt')) {
        this.createdAt = new Date(this.createdAt.getTime());
    }
    next();
});

export const OtpModel = mongoose.model('OTP', otpSchema)