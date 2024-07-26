import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const deleteCategoryController = (dependencies: IDependencies) => {
    const { usecases: { deleteCategoryUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            if (id) {
                const data = await deleteCategoryUsecase(dependencies).execute(id);
                if(data){
                    console.log(data)
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('error while deleting')
                }
            } else {
                return res.status(404).json('id is not available')
            }

        } catch (error) {
            next(error)
        }
    }
}