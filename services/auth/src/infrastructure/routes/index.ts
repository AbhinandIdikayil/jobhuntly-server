import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";

export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { signup, login } = controller(dependencies)

    router.route('/signup').post(signup);

    router.route('/login').post(login)


    return router;
}