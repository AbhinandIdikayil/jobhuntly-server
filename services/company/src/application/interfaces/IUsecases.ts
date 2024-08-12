import { IGetCompanyUsecase, IUpdateProfieUsecase,IUpdateSocialLinksUsecase , ISendRequest, IUpdateRequestUsecase, IListRequest, IGetAllCompanyUsecasee, IGetCompanyDetails, ISearchCompaniesUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    getCompanyUsecase(dependencies:IDependencies): IGetCompanyUsecase
    updateProfileUsecase(dependencies:IDependencies): IUpdateProfieUsecase
    updateSocialLinksUsecase(dependencies:IDependencies): IUpdateSocialLinksUsecase
    sendRequestUsecase(dependencies:IDependencies): ISendRequest
    updateRequestUsecase(dependencies:IDependencies): IUpdateRequestUsecase
    listRequestUsecase(dependencies:IDependencies): IListRequest
    getAllCompanyUsecase(dependencies:IDependencies): IGetAllCompanyUsecasee
    getCompanyDetailsUsecae(dependencies:IDependencies): IGetCompanyDetails
    searchCompaniesUsecae(dependencies:IDependencies): ISearchCompaniesUsecase
}