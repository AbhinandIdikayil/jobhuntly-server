import { IDependencies } from "../../application/interfaces/IDependencies"
import { googleAuthContoller } from "./googleAuth"
import { loginContoller } from "./login"
import { logoutController } from "./logout"
import { signupController } from "./signup"
import { verifyOtpContoller } from "./verifyOtp"



export const controller = (dependencies:IDependencies) => {
    return {
        signup:signupController(dependencies),
        login:loginContoller(dependencies),
        googleAuth:googleAuthContoller(dependencies),
        logout:logoutController(),
        verifyOtp:verifyOtpContoller(dependencies)
    }
}