import { IDependencies } from "../../application/interfaces/IDependencies"
import { adminLoginController } from "./AdminLogin"
import { forgotpasswordController } from "./forgotPassword"
import { googleAuthContoller } from "./googleAuth"
import { loginContoller } from "./login"
import { logoutController } from "./logout"
import { RefreshTokenController } from "./RefreshTokenController"
import { signupController } from "./signup"
import { verifyEmailController } from "./verifyEmail"
import { verifyOtpContoller } from "./verifyOtp"



export const controller = (dependencies:IDependencies) => {
    return {
        signup:signupController(dependencies),
        login:loginContoller(dependencies),
        googleAuth:googleAuthContoller(dependencies),
        logout:logoutController(),
        verifyOtp:verifyOtpContoller(dependencies),
        verifyEmail:verifyEmailController(dependencies),
        forgotPassword:forgotpasswordController(dependencies),
        adminLogin:adminLoginController(dependencies),
        refreshToken:RefreshTokenController()
    }
}