import { applicantModel } from "../../infrastructure/database/mongodb/model/applicantModel"
import { IDependencies } from "../interfaces/IDependencies"


export const updateApplicationStatusUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateApplicationStatus } } = dependencies
    return {
        execute: async (applicationId: string) => {
            try {
                return await updateApplicationStatus(applicationId)
            } catch (error) {
                throw error
            }
        }
    }
}