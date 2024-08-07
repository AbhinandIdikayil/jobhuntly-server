import { JobEntity } from "../../../../domain/entities"
import { jobModel } from "../model/jobModel"


export const editJob = async (id: string,data:JobEntity): Promise<JobEntity | null> => {
    try {   
        if(id){
            const job = await jobModel.findOneAndUpdate(
                {_id:id},
                {
                    $set:{
                        ...data
                    }
                },
                {new : true}
            )
            if(job){
                return job as unknown as JobEntity
            } else {
                return null
            }
        } else {
            return  null
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}