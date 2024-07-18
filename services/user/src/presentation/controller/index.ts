import { IDependencies } from "../../application/interfaces/IDependencies";
import { blockUserController } from "./blockUser";
import { getAllUsersController } from "./getAllusers";


export const controller  = (dependencies:IDependencies) => {
    return {
        getAllUsers:getAllUsersController(dependencies),
        blockUser:blockUserController(dependencies),
    }
}