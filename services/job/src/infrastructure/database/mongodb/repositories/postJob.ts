import { JobEntity } from "../../../../domain/entities";
import { jobModel } from "../model/jobModel";



export const postJob = async (data:JobEntity): Promise<JobEntity | null> => {
    try {
        const job = await jobModel.create(data);
        if(job){
            return job as unknown as JobEntity
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}