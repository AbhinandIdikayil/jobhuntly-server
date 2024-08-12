import { IDependencies } from "../../application/interfaces/IDependencies"
import { createChatController } from "./createChatController"

export const controller = (dependencies:IDependencies) => {
    return {
        createChat:createChatController(dependencies)
    }
}