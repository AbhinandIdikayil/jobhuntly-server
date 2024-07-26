import { IListCategory , IAddCategoryUsecase, IDeleteCategoryUsecase, IUpdateCategoryUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    addCategoryUsecase:(dependencies:IDependencies) => IAddCategoryUsecase
    listCategoryUsecase:(dependencies:IDependencies) => IListCategory
    deleteCategoryUsecase:(dependencies:IDependencies) => IDeleteCategoryUsecase
    updateCategoryUsecase:(dependencies:IDependencies) => IUpdateCategoryUsecase
}