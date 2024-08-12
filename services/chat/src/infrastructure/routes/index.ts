import { Router } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { controller } from "../../presentation/controller"


export const routes = (dependencies: IDependencies) => {
    const router = Router()
    const { createChat } = controller(dependencies)

    router.route('/create').post(createChat) //! USED TO CREATE THE CHAT

    return router
}