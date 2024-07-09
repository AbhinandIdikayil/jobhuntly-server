import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const routes = (dependencies:IDependencies) => {
    const router = Router()


    router.route('/get-allusers').get()
    
    return router
}