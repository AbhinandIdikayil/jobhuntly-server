import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";

export const routes = (dependencies:IDependencies) => {
    const router = Router()

    const {signup} = controller(dependencies)

    router.route('/signup').post(signup);


    return router;
}