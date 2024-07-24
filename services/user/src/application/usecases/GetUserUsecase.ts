import { IDependencies } from "../interfaces/IDependencies"


export const getUserUsecase = (dependencies: IDependencies) => {
    const { repositories: { getUser } } = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await getUser(email)
            } catch (error) {
                throw error
            }
        }
    }
}