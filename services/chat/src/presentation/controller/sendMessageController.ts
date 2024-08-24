import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"

export const sendMessageController = (dependencies: IDependencies) => {
    const { usecases: { sendMessageUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            const { _id } = req.user
            if (data) {
                let values = {
                    ...data,
                    senderId: _id
                }
                const result = await sendMessageUsecase(dependencies).execute(values)
                if (result) {
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