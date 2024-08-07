import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const addUserController = (dependencies: IDependencies) => {
    const { usecases: { addUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body) {
                const data = await addUserUsecase(dependencies).execute(req.body)
                if (data) {
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('couldnt create company1')
                }
            } else {
                return res.status(404).json('couldnt create company2')
            }
        } catch (error) {
            next(error)
        }
    }
}