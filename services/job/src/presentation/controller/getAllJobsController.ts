import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const getAllJobsController = (depependencies: IDependencies) => {
    const { usecases: { getAllJobsUsecase } } = depependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await getAllJobsUsecase(depependencies).execute()
            if(data) {
                console.log(data)
                return res.status(200).json(data)
            } else {
                return res.status(404).json('data is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}