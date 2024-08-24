import { ApplicantsEntity } from "../../../../../domain/entities"
import { applicantModel } from "../../model/applicantModel"


export const editInterview = async (applicantId: string, data:any, index:number): Promise<ApplicantsEntity | null> => {
    try {
        console.log(applicantId, data, index)
        const editInterview = applicantModel.findByIdAndUpdate(
            { _id: applicantId},
            {
                $set:{
                    [`schedule.${index}`] : data
                }
            }
        )
        if(editInterview){
            return editInterview as unknown as ApplicantsEntity
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}