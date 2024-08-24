import { IDependencies } from "../interfaces/IDependencies"

export const editInterviewUsecase = (dependencies: IDependencies) => {
    const { repositories: { editInterview } } = dependencies
    return {
        execute: async (applicantId: string, data:any, index:number) => {
            try {
                return await editInterview(applicantId, data, index)
            } catch (error) {
                throw error
            }
        }
    }
}