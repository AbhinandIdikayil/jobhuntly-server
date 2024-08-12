import { ChatEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"

export const createOneToOneChatUsecase = (dependencies: IDependencies) => {
    const { repositories: { createOneToOnechat } } = dependencies
    return {
        execute: async (data:ChatEntity) => {
            try {
                return await createOneToOnechat(data)
            } catch (error) {
                throw error
            }
        }
    }
}