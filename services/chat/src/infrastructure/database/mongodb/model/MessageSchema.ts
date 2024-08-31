import mongoose, { Schema } from "mongoose";

export enum MessageStatusEnum {
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read'
}

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
        enum:Object.values(MessageStatusEnum),
        default:'sent'
    }
}, { timestamps: true })




export const messageModel = mongoose.model('Messages', messageSchema)