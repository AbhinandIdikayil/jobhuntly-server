import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: String,
    contact: String,
    locations: [String],
    joinDate: Date,
    industry: String,
    images: [String],
    benefits: [{
        icon: String,
        headline: String,
        description: String,
    }],
    foundedDate: Date,
    teams: [{
        name: String,
        profile: String,
        designation: String,
    }],
    techStack: [String],
    website: String,
    employees: String,
    coverImage: String,
    approvelStatus: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending", "Message"],
        description: String,
    },
    profileCompleted: Boolean,
    profileCompletionStatus: {
        type: String,
        enum: ["1%", "2%", "3%"]
    },
    socialLinks: [String],
    icon: String,
    LinkedInLink: String,
    certificate: String,
    registrationId: String
}, { timestamps: true })

export const companyModel = mongoose.model('Company', companySchema)