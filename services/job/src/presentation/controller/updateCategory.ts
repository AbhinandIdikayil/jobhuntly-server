import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const updateCategoryController = (dependencies: IDependencies) => {
    const { usecases: { updateCategoryUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            if (data) {
                const result = await updateCategoryUsecase(dependencies).execute(data)
                if(result){
                    return res.status(200).json(result)
                } else {
                    return res.status(404).json('error while updating')
                }
            } else {
                return res.status(404).json('pleae provide input')
            }
        } catch (error) {
            next(error)
        }
    }
}