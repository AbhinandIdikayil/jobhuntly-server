import { ICreateOneToOneChat } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    createOneToOneChatUsecase:(dependencies:IDependencies) => ICreateOneToOneChat
}