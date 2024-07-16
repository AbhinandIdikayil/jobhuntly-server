import { IGetCompanyUsecase, IUpdateProfieUsecase,IUpdateSocialLinksUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    getCompanyUsecase(dependencies:IDependencies): IGetCompanyUsecase
    updateProfileUsecase(dependencies:IDependencies): IUpdateProfieUsecase
    updateSocialLinksUsecase(dependencies:IDependencies): IUpdateSocialLinksUsecase
}