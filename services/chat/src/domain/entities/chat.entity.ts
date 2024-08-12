import mongoose from "mongoose";

export interface ChatEntity {
    _id?: string,
    members: mongoose.Schema.Types.ObjectId[]
}