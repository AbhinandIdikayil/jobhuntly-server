import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const createChatController = (dependencies:IDependencies) => {
    const { usecases:{createOneToOneChatUsecase} } = dependencies
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            const {data} = req.body
            if(data) {
                const result = await createOneToOneChatUsecase(dependencies).execute(data)
                if(result){
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('Failed to create chat')
                }
            } else {
                return res.status(404).json('Please provide input data')
            }
        } catch (error) {
            next(error)
        }
    }
}