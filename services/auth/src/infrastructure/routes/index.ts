import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";

export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { signup, login , googleAuth , logout  , verifyOtp} = controller(dependencies)

    router.route('/signup').post(signup);

    router.route('/login').post(login)

    router.route('/google').post(googleAuth);

    router.route('/logout').post(logout)

    router.route('/verify-otp').post(verifyOtp)


    return router;
}