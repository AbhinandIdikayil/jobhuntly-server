import { IDependencies } from "../interfaces/IDependencies"

export const getMessagesUsecase = (dependencies: IDependencies) => {
    const { repositories: { getMessages } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await getMessages(id)
            } catch (error) {
                throw error
            }
        }
    }
}