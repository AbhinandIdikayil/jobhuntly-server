import mongoose, { Model, Schema, mongo } from "mongoose";
import bcrypt from 'bcrypt'
import { UserEntity } from "../../../../domain/entities";


const authSchema = new Schema<UserEntity>({
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
        enum: ['user', 'company', 'admin']
    },
    isBlocked:{
        type:Boolean,
        default:false,
    }
},
    {
        timestamps: true
    }
)
authSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

export const authModel =  mongoose.model('auth', authSchema)