import { IGetCompanyUsecase, IUpdateProfieUsecase,IUpdateSocialLinksUsecase , ISendRequest } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    getCompanyUsecase(dependencies:IDependencies): IGetCompanyUsecase
    updateProfileUsecase(dependencies:IDependencies): IUpdateProfieUsecase
    updateSocialLinksUsecase(dependencies:IDependencies): IUpdateSocialLinksUsecase
    sendRequestUsecase(dependencies:IDependencies): ISendRequest
}