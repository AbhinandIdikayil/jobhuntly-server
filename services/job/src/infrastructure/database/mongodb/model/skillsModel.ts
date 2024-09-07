
import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    status: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

export const SkillModel = mongoose.model('Skill',skillSchema)

