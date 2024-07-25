import { IAddCategoryUsecase } from "../../domain/usecaseInterface/addCategoryUsecase";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    addCategoryUsecase:(dependencies:IDependencies) => IAddCategoryUsecase
}