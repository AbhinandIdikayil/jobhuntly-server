import { IDependencies } from "../../application/interfaces/IDependencies"
import { loginContoller } from "./login"
import { signupController } from "./signup"



export const controller = (dependencies:IDependencies) => {
    return {
        signup:signupController(dependencies),
        login:loginContoller(dependencies)
    }
}