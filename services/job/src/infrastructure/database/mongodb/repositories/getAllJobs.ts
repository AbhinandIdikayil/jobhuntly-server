import { Types } from "mongoose";
import { getAllJobsEntity, JobEntity } from "../../../../domain/entities";
import { jobModel } from "../model/jobModel";


export const getAllJobs = async (companyId: string): Promise<getAllJobsEntity[] | null> => {
    try {
        let job;
        if (companyId) {
            job = await jobModel.aggregate([
                {
                    $match: { companyId: new Types.ObjectId(companyId) }
                },
                {
                    $lookup: {
                        from: 'applicants', // The name of the collection in MongoDB
                        localField: '_id',
                        foreignField: 'jobId',
                        as: 'applicants'
                    }
                },
                {
                    $lookup: {
                        from: 'companies', // The name of the collection in MongoDB
                        localField: 'companyId',
                        foreignField: '_id',
                        as: 'company'
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'employment',
                        foreignField: '_id',
                        as: 'employmentDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'sectors',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$applicants',
                        preserveNullAndEmptyArrays: true // Include jobs with no applicants
                    }
                },
                {
                    $unwind: {
                        path: '$company',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
                {
                    $unwind: {
                        path: '$employmentDetails',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
                {
                    $unwind: {
                        path: '$categoryDetails',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        job: { $first: '$$ROOT' }, // Keep the job document
                        applicantCount: { $sum: 1 } // Count the number of applicants
                    }
                },
            ])
        } else {
            job = await jobModel.aggregate([
                {
                    $lookup: {
                        from: 'companies', // The name of the collection in MongoDB
                        localField: 'companyId',
                        foreignField: '_id',
                        as: 'company'
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'employment',
                        foreignField: '_id',
                        as: 'employmentDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'sectors',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$company',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
                {
                    $unwind: {
                        path: '$employmentDetails',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
                {
                    $unwind: {
                        path: '$categoryDetails',
                        preserveNullAndEmptyArrays: true // Include jobs with no company info
                    }
                },
            ])
        }

        const jobs = await jobModel.find()
            .populate('employment')
            .populate('category')
            .populate('companyId')
            .exec()
        if (job.length > 0) {
            return job as unknown as getAllJobsEntity[]
        } else {
            return []
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}