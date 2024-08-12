import mongoose from "mongoose";

export interface MessageEntity {
    _id?: string,
    senderId:mongoose.Types.ObjectId,
    recieverId:  mongoose.Types.ObjectId,
    chatId: mongoose.Schema.Types.ObjectId,
    content: {
        type: 'audio' | 'image' | 'text' | 'doc',
        content: String,
    },
    status:'sent' | 'delivered' | 'read',    
}