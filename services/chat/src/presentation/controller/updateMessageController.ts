import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const updateMessageController = (dependencies: IDependencies) => {
    const { usecases: { updateMessageUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            const result = await updateMessageUsecase(dependencies).execute(data)
            if(result){
                return res.status(200).json(result)
            } else {
                return res.status(404).json('Data not found')
            }
        } catch (error) {
            next(error)
        }
    }
}