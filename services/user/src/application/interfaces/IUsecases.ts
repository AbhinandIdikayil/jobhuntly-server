import { IDependencies } from "./IDependencies";
import { addUserUsecase, IGetAllUserUsecase } from '../../domain/usecaseInterface/index'

export interface IUsecases {
    addUserUsecase:(dependencies:IDependencies) => addUserUsecase
    getAllUserUsecase:(dependencies:IDependencies) => IGetAllUserUsecase
}