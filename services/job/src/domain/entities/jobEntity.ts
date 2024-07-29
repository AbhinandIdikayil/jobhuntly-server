import mongoose from 'mongoose'

export interface JobEntity {
    jobTitle: string,
    employment: mongoose.Types.ObjectId,
    description: string,
    category: mongoose.Types.ObjectId,
    joblocation: string,
    salaryrange: {
        status: boolean,
        from: number,
        to: number,
    },
    vacancies: { status: boolean, available: number, filled: number },
    companyId: mongoose.Types.ObjectId,
    expiry: Date,
    experience: number,
    responsibilities: [string],
    completdJobAdd: {
        type: string,
        enum: ["first", "second"],
    },
    skills: [string],
    qualification: [string],
    status: boolean,
    expired: boolean,
}