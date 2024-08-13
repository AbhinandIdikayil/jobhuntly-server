import { IDependencies } from "../../application/interfaces/IDependencies"
import { createChatController } from "./createChatController"
import { listChatController } from "./listChatController"

export const controller = (dependencies:IDependencies) => {
    return {
        createChat:createChatController(dependencies),
        listChats:listChatController(dependencies)
    }
}