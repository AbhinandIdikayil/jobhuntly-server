import { ApplicantsEntity } from "../../../../domain/entities"
import { applicantModel } from "../model/applicantModel"


export const getSpecificApplicant = async (id: string): Promise<ApplicantsEntity | null> => {
    try {        
        const applicant = await applicantModel.findOne({_id:id}).populate('userId')
        if(applicant){
            return applicant as unknown as ApplicantsEntity
        } else {
            return null
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}