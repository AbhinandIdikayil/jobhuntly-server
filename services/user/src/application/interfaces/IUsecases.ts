import { IDependencies } from "./IDependencies";
import { addUserUsecase, IBlockUserUsecase, IGetAllUserUsecase } from '../../domain/usecaseInterface/index'

export interface IUsecases {
    addUserUsecase:(dependencies:IDependencies) => addUserUsecase
    getAllUserUsecase:(dependencies:IDependencies) => IGetAllUserUsecase
    blockUserUsecase:(dependencies:IDependencies) => IBlockUserUsecase
}