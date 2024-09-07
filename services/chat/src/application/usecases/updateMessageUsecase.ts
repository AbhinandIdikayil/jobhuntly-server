import { MessageEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"


export const updateMessageUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateMessage } } = dependencies
    return {
        execute: async (data: MessageEntity) => {
            try {
                return await updateMessage(data)
            } catch (error) {
                throw error
            }
        }
    }
}