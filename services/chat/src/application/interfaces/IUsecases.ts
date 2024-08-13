import { ICreateOneToOneChat, IListChatsUsecase, ISendMessageUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";


export interface IUsecases {
    createOneToOneChatUsecase:(dependencies:IDependencies) => ICreateOneToOneChat
    listChatsUsecase:(dependencies:IDependencies) => IListChatsUsecase
    sendMessageUsecase:(dependencies:IDependencies) => ISendMessageUsecase
}