import mongoose, { Document, Model, Schema, mongo } from "mongoose";
import bcrypt from 'bcrypt'
import { OtpModel } from "./otpModel";

interface IAuth extends Document {
    name: string,
    email: string,
    password: string,
    role: string
    isBlocked: boolean,
    matchPassword(enteredPassword: string): Promise<boolean>,
    updatePassword(enteredPassword:string): Promise<any>
}


const authSchema = new Schema<IAuth>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'company', 'admin'],
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true
    }
)
authSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

authSchema.methods.updatePassword = async function (enteredPassword:string) {
    this.password = enteredPassword
    await this.save()
    return this.password;
}

authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

authSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await OtpModel.deleteMany({ user: this._id })
        next()
    } catch (error: any) {
        next(error)
    }
})

export const authModel = mongoose.model('Auth', authSchema) 