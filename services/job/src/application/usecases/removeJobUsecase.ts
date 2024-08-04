import { IDependencies } from "../interfaces/IDependencies";


export const removeJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { removeJob } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await removeJob(id)
            } catch (error) {
                throw error
            }
        }
    }

}