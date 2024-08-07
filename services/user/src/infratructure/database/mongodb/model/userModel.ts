import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: [true, "Email alrady taken!!"],
            required: [true, "Please Provide email"],
        },
        password: {
            type: String,
            required: [true, "provide password"],
        },
        role: {
            type: String,
            enum: ["user", "admin", "company"],
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        },
        phonenumber: String,
        dateofbirth: Date,
        resume: String,
        skills: [String],
        personalsite: String,
        socialLink: [String],
        coverImage: String,
        icon: String,
        location: String,
        about: String,
        currengDesignation: String,
        education: [
            {
                image: String,
                university: String,
                course: String,
                company: String,
                year: { from: Date, to: Date },
                description: String,
            },
        ],
        experiences: [
            {
                working:Boolean,
                title: String,
                description: String,
                company: String,
                image: String,
                year: { from: Date, to: Date }
            },
        ],
        profileCompleted: Boolean,
        resumes: [String],
        stage: String,
        savedJobs: [String],
        certification: [{ title: String, file: String }],
    },
    { timestamps: true }
)


export const userModel = mongoose.model('User',userSchema)