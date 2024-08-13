import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"


export const createChatController = (dependencies: IDependencies) => {
    const { usecases: { createOneToOneChatUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id } = req?.user || {}
            const { data } = req.body
            console.log(req.body, _id)
            if (req.body && _id) {
                const value = {
                    members:[
                        _id,
                        data
                    ]
                }
                const result = await createOneToOneChatUsecase(dependencies).execute(value)
                if (result) {
                    return res.status(200).json(result)
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