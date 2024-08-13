import { IDependencies } from "../interfaces/IDependencies"

export const listChatsUsecase = (dependencies: IDependencies) => {
    const { repositories: { listChats } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await listChats(id)
            } catch (error) {
                throw error
            }
        }
    }
}