import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { dependencies } from "../../config/dependencies"


export const getAllJobsController = (depependencies: IDependencies) => {
    const { usecases: { getAllJobsUsecase } } = depependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            let data
            if(id){
                data = await getAllJobsUsecase(dependencies).execute(id)
            } else {
                data = await getAllJobsUsecase(depependencies).execute()
            }
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('data is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}