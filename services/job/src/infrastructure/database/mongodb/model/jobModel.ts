import mongoose from 'mongoose'


const jobSchema = new mongoose.Schema({
    jobTitle: String,
    employment: String,
    description: String,
    category: mongoose.Types.ObjectId,
    joblocation: String,
    salaryrange: {
        status: Boolean,
        from: Number,
        to: Number,
    },
    vacancies: { status: Boolean, available: Number, filled: Number },
    experince: Number,
    companyId: mongoose.Types.ObjectId,
    expiry: Date,
    experience: Number,
    responsibilities: String,
    completdJobAdd: {
        type: String,
        enum: ["first", "second"],
    },
    skills: [String],
    qualification: [String],
    status: Boolean,
    expired: Boolean,
})