import { ApplicantsEntity } from "../../../../../domain/entities"
import { applicantModel } from "../../model/applicantModel"

export const scheduleInterview = async (applicantId: string, time: string, date: string, type: string): Promise<ApplicantsEntity | null> => {
    try {
        const status = await applicantModel.findById(applicantId)
        if(status?.hiring_status !== 'interview') {
            throw new Error('Hiring status is not in interview')
        }
        const applicant = await applicantModel.findByIdAndUpdate(
            { _id:applicantId },
            {
                $push: {
                    schedule: {
                        testType: type,
                        date: date,
                        time: time,
                    }
                }
            },
            { new: true }
        ).populate('userId').populate('companyId')
        if(applicant) {
            return applicant as unknown as ApplicantsEntity
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}