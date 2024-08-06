import { IDependencies } from "../interfaces/IDependencies"


export const getSpecificApplicantUsecase = (dependencies: IDependencies) => {
    const { repositories: { getSpecificApplicant } } = dependencies
    return {
        execute: async (applicantId: string) => {
            try {
                return await getSpecificApplicant(applicantId)
            } catch (error) {
                throw error
            }
        }
    }
}