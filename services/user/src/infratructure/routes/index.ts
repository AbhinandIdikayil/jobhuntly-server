import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import {verifyToken} from '../../utils/verifyToken'

export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { getAllUsers, blockUser , getUser, updateProfile } = controller(dependencies)

    //! ROUTES FOR USER SIDE
    router.route('/user').get(verifyToken ,getUser)
    router.route('/update-profile').post(verifyToken,updateProfile)

    //! ------------ ROUTES FOR ADMIN SIDE -------------
    router.route('/get-allusers').get(verifyToken,getAllUsers);

    router.route('/block-user').put(verifyToken,blockUser);

    return router
}