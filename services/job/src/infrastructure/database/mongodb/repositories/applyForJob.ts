import { resumeAnalyzer } from "../../../../utils/resumeAnalyzer"
import { applicantModel } from "../model/applicantModel"
import { jobModel } from "../model/jobModel"
import { userModel } from "../model/userMode"


export const applyForJob = async (userid: string, jobid: string, resume: string, companyId: string): Promise<boolean | null> => {
    try {
        if (userid && jobid) {
            let user = await userModel.findById({ _id: userid })
            if (!user) {
                return false
            }
            let isApplied = await applicantModel.findOne({ companyId, jobId: jobid, userId: userid })
            if (isApplied) {
                throw new Error('Already applied')
            }
            const job = await jobModel.findById(jobid);
            const score = await resumeAnalyzer(resume, job?.skills,job?.qualification);

            let applicant = await applicantModel.create({
                companyId,
                jobId: jobid,
                userId: userid,
                resume,
                mark:score
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
        throw new Error(error?.message)
    }
}