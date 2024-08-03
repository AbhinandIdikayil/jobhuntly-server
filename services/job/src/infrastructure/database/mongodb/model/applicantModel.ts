import mongoose from 'mongoose'


const ApplicantsSchema = new mongoose.Schema({
    // companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    deleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    hiring_status: { type: String, enum: ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'], default: 'in-review' },
    resume: { type: String },
    answers: { type: Array },
    hiring_info: [{
        name: { type: String },
        notes: { type: String },
    }],
});


export const applicantModel = mongoose.model('Applicant',ApplicantsSchema)