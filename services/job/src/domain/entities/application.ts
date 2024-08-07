
export interface ApplicationEntity {
    _id: string;
    jobId: {
        _id?: string,
        jobTitle?: string,
        employment?: string,
        description?: string,
        category?: string,
        joblocation?: string,
        salaryrange?: {
            status?: boolean,
            from?: number,
            to?: number,
        },
        vacancies?: { status?: boolean, available?: number, filled?: number },
        expiry?: Date,
        experience?: number,
        responsibilities?: [string],
        completdJobAdd?: {
            type?: string,
            enum?: ["first", "second"],
        },
        skills?: [string],
        qualification?: [string],
        status?: boolean,
        expired?: boolean,
        createdAt?: string,
        updatedAt?: string,
    };
    deleted: boolean;
    userId: string;
    hiring_status: string;
    resume: string;
    answers: any[];
    createdAt: string;
    hiring_info: any[];
}

export interface ApplicantsEntity {
    _id: string;
    jobId: {
        _id?: string,
        jobTitle?: string,
        employment?: string,
        description?: string,
        category?: string,
        joblocation?: string,
        salaryrange?: {
            status?: boolean,
            from?: number,
            to?: number,
        },
        vacancies?: { status?: boolean, available?: number, filled?: number },
        expiry?: Date,
        experience?: number,
        responsibilities?: [string],
        completdJobAdd?: {
            type?: string,
            enum?: ["first", "second"],
        },
        skills?: [string],
        qualification?: [string],
        status?: boolean,
        expired?: boolean,
        createdAt?: string,
        updatedAt?: string,
    };
    deleted: boolean;
    userId: {
        name?: string
        email?: string,
        password?: string,
        role?: string,
        about?: string,
        phonenumber?: string,
        dateofbirth?: Date,
        skills?: string[],
        personalsite?: string,
        socialLink?: string[],
        coverImage?: string,
        icon?: string,
        location?: string,
        currengDesignation?: string,
        resumes?: string[],
        education?: [
            {
                image?: string,
                university: string,
                course: string,
                year: { from: Date, to: Date },
                description?: string,
            },
        ],
        experiences?: [
            {
                title: string,
                description: string,
                image: string,
                location: string,
            },
        ],
        certification?: [{ title: string, file: string }]
    };
    hiring_status: string;
    resume: string;
    answers: any[];
    createdAt: string;
    hiring_info: any[];
}