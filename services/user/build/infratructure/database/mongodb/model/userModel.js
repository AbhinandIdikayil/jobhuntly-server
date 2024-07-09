"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
    blockStatus: {
        type: Boolean,
        default: true,
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
            year: { from: Date, to: Date },
            description: String,
        },
    ],
    experiences: [
        {
            title: String,
            description: String,
            image: String,
            location: String,
        },
    ],
    profileCompleted: Boolean,
    resumes: [String],
    stage: String,
    savedJobs: [String],
    certification: [{ title: String, file: String }],
}, { timestamps: true });
exports.userModel = mongoose_1.default.model('User', userSchema);
