import { JobEntity } from "../../../../domain/entities"
import { jobModel } from "../model/jobModel"



export const removeJob = async (id: string): Promise<JobEntity | null> => {
    try {
        const job = await jobModel.findOneAndUpdate(
            {_id:id},
            {
                $set:{
                    status: true
                }
            },
            {
                new: true
            }
        )
        if(job){
            return job as unknown as JobEntity
        } else {
            return null
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}