
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