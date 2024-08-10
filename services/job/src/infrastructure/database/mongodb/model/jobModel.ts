import mongoose from 'mongoose'


const jobSchema = new mongoose.Schema({
    jobTitle: String,
    employment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector'
    },
    joblocation: String,
    salaryrange: {
        status: Boolean,
        from: Number,
        to: Number,
    },
    vacancies: { status: Boolean, available: Number, filled: Number },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    expiry: Date,
    experience: Number,
    responsibilities: [String],
    completdJobAdd: {
        type: String,
        enum: ["first", "second"],
    },
    skills: [String],
    qualification: [String],
    status: {
        type: Boolean,
        default:false
    },
    expired: Boolean,
}, { timestamps: true })

export const jobModel = mongoose.model('Job', jobSchema)