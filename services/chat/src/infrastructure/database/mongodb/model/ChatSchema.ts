import mongoose, { Schema } from "mongoose";


const chatSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, }],
}, { timestamps: true })

export const chatModel = mongoose.model('Chat',chatSchema);