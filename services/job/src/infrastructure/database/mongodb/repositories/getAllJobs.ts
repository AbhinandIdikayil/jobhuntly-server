import { JobEntity } from "../../../../domain/entities";
import { jobModel } from "../model/jobModel";


export const getAllJobs = async (): Promise<JobEntity[] | null> => {
    try {
        const jobs = await jobModel.find()
            .populate('employment')
            .populate('category')
            .populate('companyId')
            .exec()
        if(jobs.length > 0){
            return jobs as unknown as JobEntity[]
        } else {
            return []
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}