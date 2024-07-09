import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";


export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { getAllUsers } = controller(dependencies)

    router.route('/get-allusers').get(getAllUsers)

    return router
}