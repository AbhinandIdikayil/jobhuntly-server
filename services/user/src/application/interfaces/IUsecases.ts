import { IDependencies } from "./IDependencies";
import { addUserUsecase, IBlockUserUsecase, IGetAllUserUsecase, IGetUserUsecase } from '../../domain/usecaseInterface/index'

export interface IUsecases {
    addUserUsecase:(dependencies:IDependencies) => addUserUsecase
    getAllUserUsecase:(dependencies:IDependencies) => IGetAllUserUsecase
    blockUserUsecase:(dependencies:IDependencies) => IBlockUserUsecase
    getUserUsecase:(dependencies:IDependencies) => IGetUserUsecase
}