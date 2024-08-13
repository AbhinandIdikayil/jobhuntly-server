import { MessageEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"

export const sendMessageUsecase = (dependencies: IDependencies) => {
    const { repositories: { sendMessage } } = dependencies
    return {
        execute: async (data:MessageEntity) => {
            try {
                return await sendMessage(data)
            } catch (error) {
                throw error
            }
        }
    }
}