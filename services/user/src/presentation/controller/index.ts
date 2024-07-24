import { IDependencies } from "../../application/interfaces/IDependencies";
import { blockUserController } from "./blockUser";
import { getAllUsersController } from "./getAllusers";
import { getUserController } from "./getUser";


export const controller  = (dependencies:IDependencies) => {
    return {
        getAllUsers:getAllUsersController(dependencies),
        blockUser:blockUserController(dependencies),
        getUser:getUserController(dependencies)
    }
}