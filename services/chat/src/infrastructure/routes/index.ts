import { Router } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { controller } from "../../presentation/controller"
import { verifyToken } from "../../utils/verifyToken"


export const routes = (dependencies: IDependencies) => {
    const router = Router()
    const { createChat, listChats, sendMessage, allMessages } = controller(dependencies)

    router.route('/create').post(verifyToken, createChat) //! USED TO CREATE THE CHAT

    router.route('/list').get(verifyToken,listChats)

    router.route('/message')
        .post(verifyToken,sendMessage)
        .get(verifyToken,allMessages)


    return router
}