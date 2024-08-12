import { IDependencies } from "../../application/interfaces/IDependencies";
import { blockUserController } from "./blockUser";
import { getAllUsersController } from "./getAllusers";
import { getUserController } from "./getUser";
import { searchUserController } from "./searchUser";
import { updateProfileController } from "./updateProfile";


export const controller  = (dependencies:IDependencies) => {
    return {
        getAllUsers:getAllUsersController(dependencies),
        blockUser:blockUserController(dependencies),
        getUser:getUserController(dependencies),
        updateProfile:updateProfileController(dependencies),
        searchUsers:searchUserController(dependencies)
    }
}