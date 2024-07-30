import { IListCategory , IAddCategoryUsecase, IDeleteCategoryUsecase, IUpdateCategoryUsecase, 
    IAddSectorUsecase ,listSectorUsecase, IPostJobUsecase, IAddCompanyUsecase, IAddUserUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    addCategoryUsecase:(dependencies:IDependencies) => IAddCategoryUsecase
    listCategoryUsecase:(dependencies:IDependencies) => IListCategory
    deleteCategoryUsecase:(dependencies:IDependencies) => IDeleteCategoryUsecase
    updateCategoryUsecase:(dependencies:IDependencies) => IUpdateCategoryUsecase
    addSectorUsecase:(dependencies:IDependencies) => IAddSectorUsecase
    listSectorUsecase:(dependencies:IDependencies) => listSectorUsecase
    postJobUsecase:(dependencies:IDependencies) => IPostJobUsecase
    addCompanyUsecase:(dependencies:IDependencies) => IAddCompanyUsecase
    addUserUsecase:(depependencies:IDependencies) => IAddUserUsecase
}