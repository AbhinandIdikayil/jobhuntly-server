import { Types } from "mongoose";
import { filterPagination, getAllJobsEntity, JobEntity } from "../../../../domain/entities";
import { jobModel } from "../model/jobModel";

export const getAllJobs = async (companyId: string, option?: filterPagination): Promise<getAllJobsEntity[] | null> => {
    try {
        let job: any;
        let f = [
            { $skip: (option?.page || 0) * (option?.pageSize ?? 5) },
            { $limit: option?.pageSize ?? 5 }
        ]
        if(option?.pageSize === Infinity){
            f = []
        }
        if (companyId) {
            job = await jobModel.aggregate([
                {
                    $match: {
                        companyId: new Types.ObjectId(companyId),
                        ...(option?.name ? {
                            jobTitle: {
                                $regex: option?.name, // Search term
                                $options: 'i' // Case-insensitive search
                            }
                        } : {})
                    },

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
                    $addFields: {
                        'countApplicant': { $size: '$applicants' }
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
                    $lookup: {
                        from: 'users',
                        localField: 'applicants.userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$userDetails',
                        preserveNullAndEmptyArrays: true // Include jobs with no user details
                    }
                },
                {
                    $addFields: {
                        'applicants.user': '$userDetails' // Add user details to each applicant
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        job: { $first: '$$ROOT' },
                        applicants: { $push: '$applicants' },
                        applicantCount: { $sum: 1 }
                    }
                },
                {
                    $addFields: {
                        'applicantCount': '$job.countApplicant'
                    }
                },
                {
                    $sort: {
                        'job.createdAt': -1 // Replace 'createdAt' with your date field and adjust sorting order as needed
                    }
                },
                {
                    $facet: {
                        jobs: [
                            // { $skip: (option?.page || 0) * (option?.pageSize || 5) },
                            // { $limit: option?.pageSize ?? 5 }
                            ...f
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                }
            ])
        } else {
            const objectIds = option?.category?.map(id => new Types.ObjectId(id)) ?? [];
            const employmentIds = option?.employment?.map(id => new Types.ObjectId(id) ?? [])
            // Convert salary range strings to numbers
            const salaryRange = option?.price?.map(Number) ?? [];
            const [minSalary, maxSalary] = salaryRange.length === 2 ? salaryRange : [undefined, undefined];
            console.log(minSalary, maxSalary , salaryRange)
            job = await jobModel.aggregate([
                {
                    $match: {
                        ...(option?.name ? {
                            jobTitle: {
                                $regex: option?.name, // Search term
                                $options: 'i' // Case-insensitive search
                            }
                        } : {}),
                        ...(option?.location ? {
                            location: {
                                $elemMatch: {
                                    $regex: option.location,
                                    $options: 'i' // Case-insensitive search
                                }
                            }
                        } : {}),
                        ...(option?.category?.length ? {
                            category: {
                                $in: objectIds
                            }
                        } : {}),
                        ...(option?.employment?.length ? {
                            employment: {
                                $in: employmentIds
                            }
                        } : {}),
                        ...(salaryRange.length === 2 ? {
                            'salaryrange.from': { $gte: minSalary }, // From less than or equal to maxSalary
                            'salaryrange.to': { $lte: maxSalary } // To greater than or equal to minSalary
                        } : {})

                    },

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
                    $sort: {
                        'job.createdAt': -1 // Replace 'createdAt' with your date field and adjust sorting order as needed
                    }
                },
                {
                    $facet: {
                        jobs: [
                            { $skip: (option?.page || 0) * (option?.pageSize ?? 5) },
                            { $limit: option?.pageSize ?? 5 }
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                }
            ])
        }
        const jobs = await jobModel.find()
            .populate('employment')
            .populate('category')
            .populate('companyId')
            .exec()
        if (job.length > 0) {
            return job[0] as unknown as getAllJobsEntity[]
        } else {
            return []
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}