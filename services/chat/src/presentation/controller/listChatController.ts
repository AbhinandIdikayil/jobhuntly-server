import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"

export const listChatController = (dependencies: IDependencies) => {
    const { usecases: { listChatsUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            if(_id) {
                const result = await listChatsUsecase(dependencies).execute(_id)
                if(result) {
                    return res.status(200).json(result)
                } else {
                    return res.status(404).json('No data found')
                }
            } else {
                return res.status(401).json({ error: "Access denied. No token provided." });
            }
        } catch (error) {
            next(error)
        }
    }
}