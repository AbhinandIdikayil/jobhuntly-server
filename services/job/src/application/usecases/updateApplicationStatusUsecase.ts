import { applicantModel } from "../../infrastructure/database/mongodb/model/applicantModel"
import { IDependencies } from "../interfaces/IDependencies"


export const updateApplicationStatusUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateApplicationStatus } } = dependencies
    return {
        execute: async (applicationId: string,hired?:boolean) => {
            try {
                if(hired === true || hired === false){
                    return await updateApplicationStatus(applicationId,hired)
                } else {
                    return await updateApplicationStatus(applicationId)
                }
            } catch (error) {
                throw error
            }
        }
    }
}