import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
    },
    recieverId: {
        type: mongoose.Types.ObjectId
    },
    chatId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    content: {
        type: {
            type: String,
            enum: ['audio', 'image', 'text', 'doc']
        },
        content: String,
    },
    status:{
        type: String,
        enum:['sent','delivered','read'],
        default:'sent'
    }
}, { timestamps: true })

export const messageModel = mongoose.model('Messages', messageSchema)