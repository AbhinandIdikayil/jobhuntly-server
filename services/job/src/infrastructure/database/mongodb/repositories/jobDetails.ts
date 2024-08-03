import { JobEntity } from "../../../../domain/entities"
import { jobModel } from "../model/jobModel"


export const jobDetails = async (id: string): Promise<JobEntity[] | null> => {
    try {
        console.log(id)
        const jobs = await jobModel.find({companyId:id})
            .populate('category')
            .populate('employment')
        if(jobs.length > 0) {
            return jobs as unknown as JobEntity[]
        } else {
            return []
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}