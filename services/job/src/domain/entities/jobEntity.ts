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

export interface getAllJobsEntity {
    _id?: string,
    job?: {
        _id?: string,
        jobTitle?: string,
        employment?: string,
        description?: string,
        category?: string,
        salaryrange?: { from?: 10000, to?: 1000000 },
        companyId?: string,
        expiry?: Date,
        responsibilities?: [string],
        skills?: [string],
        qualification?: [string],
        createdAt?: Date,
        updatedAt?: Date,
        status?: boolean,
        applicants?: {
            _id?: string,
            companyId?: string,
            jobId?: string,
            deleted?: boolean,
            userId?: string,
            hiring_status?: string,
            resume?: string,
            answers?: [],
            createdAt?: Date,
            hiring_info?: [{
                name?: string,
                notes?: string,
            }],
        },
        company?: {
            _id?: string,
            email?: string,
            name?: string,
            password?: string,
            description?: string,
            locations?: [string],
            industry?: string,
            images?: string,
            benefits?: [],
            foundedDate?: null,
            teams?: [],
            techStack?: [string],
            website?: string,
            employees?: string,
            approvalStatus?: string,
            socialLinks?: [string],
            isBlocked?: boolean,
            createdAt?: Date,
            LinkedInLink?: string,
            profileCompletionStatus?: string
        },
        employmentDetails?: {
            _id?: string,
            name?: string,
            description?: string,
            image?: string,
            status?: false,
            createdAt?: string,
        },
        categoryDetails?: {
            _id?: string,
            name?: string,
            image?: string,
            isDeleted?: boolean,
            createdAt?: Date,
          }
    },
    applicantCount?: number
}


export interface filterPagination {
    name?: string | null,
    location?: string,
    pageSize?: number,
    page?: number,
    category?: [string] | [],
    employment?: [string] | [],
    price?: [string] | []
}