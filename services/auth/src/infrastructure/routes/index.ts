import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from '../../utils/common/jwtMiddleware'

export const routes = (dependencies: IDependencies) => {




    const router = Router()
    const { signup, login, googleAuth, logout,
        verifyOtp, verifyEmail, forgotPassword, adminLogin } = controller(dependencies)

    router.route('/signup').post(signup);

    router.route('/login').post(login)

    router.route('/google').post(googleAuth);

    router.route('/logout').post(logout)

    router.route('/verify-otp').post(verifyOtp);

    router.route('/verify-email').post(verifyEmail)

    router.route('/forgot-password').put(forgotPassword)

    router.route('/admin').post(adminLogin)

    return router;
}