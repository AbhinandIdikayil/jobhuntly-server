import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";



export interface CompanyDocument extends Document {
    email: string;
    name: string;
    password: string;
    description?: string;
    contact?: string;
    locations?: string[];
    joinDate?: Date;
    industry?: string;
    images?: string[];
    benefits?: {
        icon: string;
        headline: string;
        description: string;
    }[];
    foundedDate?: Date;
    teams?: {
        name: string;
        profile: string;
        designation: string;
    }[];
    techStack?: string[];
    website?: string;
    employees?: string;
    coverImage?: string;
    approvelStatus?: {
        type: string;
        enum: ["Accepted", "Rejected", "Pending", "Message"];
        description: string;
    };
    profileCompleted?: boolean;
    profileCompletionStatus?: {
        type: string;
        enum: ["1%", "2%", "3%"];
    };
    socialLinks?: string[];
    icon?: string;
    LinkedInLink?: string;
    certificate?: string;
    registrationId?: string;
}

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
    images: String,
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
    approvalStatus: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending", "Message"],
        description: String,
        default:'Rejected'
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
    registrationId: String,
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const companyModel = mongoose.model<CompanyDocument>('Company', companySchema)