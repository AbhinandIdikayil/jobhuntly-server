import { IGoogleUsecase, ILoginUsecase, ISignupUsecase, IVerifyOtpUsecase , IVerifyEmail ,IForgotPasswordUsecase} from "../../domain/usecaseInterface";
import { IAdminLoginUsecase } from "../../domain/usecaseInterface/IAdminLoginUsecase";
import { IDependencies } from "./IDependencies";



export interface IUsecases  {
    signupUsecase:(dependencies:IDependencies) => ISignupUsecase;
    loginUsecase:(dependencies:IDependencies) => ILoginUsecase
    googleAuthUsecase:(dependencies:IDependencies) => IGoogleUsecase;
    verifyOtpUsecase:(dependencies:IDependencies) => IVerifyOtpUsecase
    verifyEmailUsecase:(dependencies:IDependencies) => IVerifyEmail;
    forgotPasswordUsecase:(dependencies:IDependencies) => IForgotPasswordUsecase
    adminLoginUsecase:(dependencies:IDependencies) =>  IAdminLoginUsecase
}