import mongoose from "mongoose";


const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    image: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
{ timestamps: true }
)


export const sectorModel = mongoose.model('Sector', sectorSchema)