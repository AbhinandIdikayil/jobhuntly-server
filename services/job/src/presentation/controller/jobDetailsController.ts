import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const jobDetailsController = (dependencies: IDependencies) => {
    const { usecases: { jobDetailsUsecae } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            if (!id) return res.status(404).json('id is undefined');
            const data = await jobDetailsUsecae(dependencies).execute(id)
            if(data){
                return res.status(200).json(data)
            } else {
                return res.status(404).json('data not found')
            }
        } catch (error) {
            next(error)
        }
    }
}