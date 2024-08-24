import mongoose from 'mongoose'


const ApplicantsSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    deleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    hiring_status: { type: String, enum: ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'], default: 'in-review' },
    resume: { type: String },
    answers: { type: Array },
    schedule: [
        {
            testType: { type: String },
            date: { type: String },
            roomId: { type: String },
            time: { type: String },
            status: { type: String, default: "pending" },
            feedback: { type: String }
        },
    ],
    mark:Number,
});


export const applicantModel = mongoose.model('Applicant', ApplicantsSchema)