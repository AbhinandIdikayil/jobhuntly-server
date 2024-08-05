import { applicantModel } from "../model/applicantModel"
import { userModel } from "../model/userMode"


export const applyForJob = async (userid: string, jobid: string, resume: string,companyId: string): Promise<boolean | null> => {
    try {
        if (userid && jobid) {
            let user = await userModel.findById({ _id: userid })
            if(!user){
                return false
            }
            let applicant = await applicantModel.create({
                companyId,
                jobId: jobid,
                userId: userid,
                resume
            })
            if (applicant) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}