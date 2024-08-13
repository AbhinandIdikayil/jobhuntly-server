import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const getMessageController = (dependencies: IDependencies) => {
    const { usecases: { getMessagesUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.query?.chat as string
            if(chatId){
                const data = await getMessagesUsecase(dependencies).execute(chatId)
                if(data) {
                    return res.status(200).json(data);
                } else {
                    return res.status(404).json('no data found')
                }
            } else {
                return res.status(404).json('Chat is not provided')
            }
        } catch (error) {
            next(error)
        }
    }
}