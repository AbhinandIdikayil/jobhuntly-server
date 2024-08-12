import { IDependencies } from "../interfaces/IDependencies"


export const searchUsersUsecase = (dependencies: IDependencies) => {
    const { repositories: { searchUsers } } = dependencies
    return {
        execute: async (value: string) => {
            try {
                return await searchUsers(value)
            } catch (error) {
                throw error
            }
        }
    }
}
