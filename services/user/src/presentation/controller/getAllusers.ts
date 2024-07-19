import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const getAllUsersController = (dependencies:IDependencies) => {
    const {usecases:{getAllUserUsecase}} = dependencies
    return async (req:Request , res: Response , next: NextFunction) => {
        try {
            const data = await getAllUserUsecase(dependencies).execute()
            if(data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('something went wrong')
            }
        } catch (error) {
            next(error)
        }
    }
}