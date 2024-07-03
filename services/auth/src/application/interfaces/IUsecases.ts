import { ISignupUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases  {
    signupUsecase:(dependencies:IDependencies) => ISignupUsecase;
}