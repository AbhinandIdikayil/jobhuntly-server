import { IDependencies } from "./IDependencies";
import { addUserUsecase, IBlockUserUsecase, IGetAllUserUsecase, IGetUserUsecase, ISearchUsersUsecase, IUpdateProfileUsecase } from '../../domain/usecaseInterface/index'

export interface IUsecases {
    addUserUsecase:(dependencies:IDependencies) => addUserUsecase
    getAllUserUsecase:(dependencies:IDependencies) => IGetAllUserUsecase
    blockUserUsecase:(dependencies:IDependencies) => IBlockUserUsecase
    getUserUsecase:(dependencies:IDependencies) => IGetUserUsecase
    updateProfileUsecase:(dependencies:IDependencies) => IUpdateProfileUsecase
    searchUsersUsecase:(dependencies:IDependencies) => ISearchUsersUsecase
}