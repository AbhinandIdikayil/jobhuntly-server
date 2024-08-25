import mongoose from 'mongoose'
import { applicantModel } from './applicantModel'
import { resumeAnalyzer } from '../../../../utils/resumeAnalyzer'


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
    location: [String],
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
        default: false
    },
    expired: Boolean,
}, { timestamps: true })

jobSchema.post('findOneAndUpdate', async function (doc, next) {
    if (!doc.isNew) {
        console.log('HIiiiiiiiiiiiiii')
        try {
            const applicants = await applicantModel.find({ jobId: doc._id })
            for (let applicant of applicants) {
                if (applicant?.resume) {
                    const newScore = await resumeAnalyzer(applicant?.resume, doc.skills, doc.qualification)
                    applicant.mark = newScore;
                    await applicant.save();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    next()
})

export const jobModel = mongoose.model('Job', jobSchema)