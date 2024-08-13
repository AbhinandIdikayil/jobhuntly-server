import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const sendMessageController = (dependencies: IDependencies) => {
    const { usecases: { sendMessageUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {data} = req.body
            if(data) {
                const result = await sendMessageUsecase(dependencies).execute(data)
                if(result){
                    return res.status(200).json(result)
                } else {
                    return res.status(404).json('Failed to send message')
                }
            } else {
                return res.status(404).json('Input is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}