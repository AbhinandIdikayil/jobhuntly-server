import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import {verifyToken} from '../../utils/verifyToken'

export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { getAllUsers, blockUser } = controller(dependencies)

    //! ROUTES FOR USER SIDE
    

    //! ------------ ROUTES FOR ADMIN SIDE -------------
    router.route('/get-allusers').get(getAllUsers);

    router.route('/block-user').put(blockUser);

    return router
}