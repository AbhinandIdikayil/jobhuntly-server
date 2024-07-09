import { IDependencies } from "../../application/interfaces/IDependencies";
import { getAllUsersController } from "./getAllusers";


export const controller  = (dependencies:IDependencies) => {
    return {
        getAllUsers:getAllUsersController(dependencies),
    }
}