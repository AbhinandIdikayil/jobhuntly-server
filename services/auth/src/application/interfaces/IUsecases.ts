import { IGoogleUsecase, ILoginUsecase, ISignupUsecase, IVerifyOtpUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases  {
    signupUsecase:(dependencies:IDependencies) => ISignupUsecase;
    loginUsecase:(dependencies:IDependencies) => ILoginUsecase
    googleAuthUsecase:(dependencies:IDependencies) => IGoogleUsecase;
    verifyOtpUsecase:(dependencies:IDependencies) => IVerifyOtpUsecase
}