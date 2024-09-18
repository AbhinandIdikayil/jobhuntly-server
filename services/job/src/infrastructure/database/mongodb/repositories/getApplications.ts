import { ApplicationEntity } from "../../../../domain/entities";
import { applicantModel } from "../model/applicantModel";


export const getApplications = async (userId: string):Promise<ApplicationEntity[] | null> => {
    try {
        const applications = await applicantModel.find({userId}).sort({createdAt:-1}).populate('companyId').populate('jobId')
        if(applications.length > 0){
            return applications as unknown as ApplicationEntity[]
        } else {
            return null
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}