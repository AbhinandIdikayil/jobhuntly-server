import { ILoginUsecase, ISignupUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases  {
    signupUsecase:(dependencies:IDependencies) => ISignupUsecase;
    loginUsecase:(dependencies:IDependencies) => ILoginUsecase
}