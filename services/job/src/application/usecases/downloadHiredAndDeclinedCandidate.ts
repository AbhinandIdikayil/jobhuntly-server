import { IDependencies } from "../interfaces/IDependencies"


export const downloadHiredAndDeclinedCandidateUsecase = (dependencies: IDependencies) => {
    const { repositories: { downloadHiredAndRejectedCandidate } } = dependencies
    return {
        execute: async (id: string) => {
            try {
              return await downloadHiredAndRejectedCandidate(id)  
            } catch (error) {
                throw error
            }
        }
    }
}