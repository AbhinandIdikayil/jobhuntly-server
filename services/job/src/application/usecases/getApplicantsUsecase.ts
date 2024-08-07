import { IDependencies } from "../interfaces/IDependencies"


export const getApplicantsUsecase = (dependencies: IDependencies) => {
    const { repositories: { getApplicants } } = dependencies
    return {
        execute: async (companyId: string) => {
            try {
                return await getApplicants(companyId)
            } catch (error) {
                throw error
            }
        }
    }
}