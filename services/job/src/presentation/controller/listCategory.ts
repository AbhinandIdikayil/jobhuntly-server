import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const listCategoryController = (dependencies: IDependencies) => {
    const { usecases: { listCategoryUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await listCategoryUsecase(dependencies).execute()
            if(data){
                return res.status(200).json(data)
            } else {
                return res.status(404).json({message:'something has happened'})
            }
        } catch (error) {
            next(error)
        }
    }
}