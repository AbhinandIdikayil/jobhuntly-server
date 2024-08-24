import { JobEntity } from "../../../../domain/entities"
import { jobModel } from "../model/jobModel"


export const updateExpiredJobs = async (): Promise<boolean | null> => {
    try {
        const now = new Date(); // Create a Date object
        const nowISOString = now.toISOString(); 
        const expiredJobs = await jobModel.updateMany(
            { expiry: { $lte: nowISOString}, expired: false },
            { $set: {expired: true} },
        )
        if(expiredJobs){
            return true
        } else {
            return null
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}