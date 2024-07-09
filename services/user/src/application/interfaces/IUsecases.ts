import { IDependencies } from "./IDependencies";
import { addUserUsecase } from '../../domain/usecaseInterface/index'

export interface IUsecases {
    addUserUsecase:(dependencies:IDependencies) => addUserUsecase
}