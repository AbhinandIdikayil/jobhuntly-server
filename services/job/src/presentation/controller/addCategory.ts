import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const addCategoryController = (dependencies: IDependencies) => {
    const { usecases: { addCategoryUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            console.log(req.body)
            const result = await addCategoryUsecase(dependencies).execute(data)
            if(result) {
                return res.status(200).json(result)
            } else {
                return res.status(404).json({message:'couldnt create category'});
            }
        } catch (error) {
            next(error)
        }
    }
}