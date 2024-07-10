import mongoose, { Schema } from "mongoose";


const approvalSchema = new  Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
})

export const approvalModel = mongoose.model('Approval',approvalSchema)