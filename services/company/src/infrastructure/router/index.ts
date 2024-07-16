import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from "../../utils/verifyToken";


export const routes = (dependencies:IDependencies) => {
    const router = Router()

    const {getCompany} = controller(dependencies)
    
    router.route('/company').get(verifyToken, getCompany)

    return router
}