import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const updateProfileController = (dependencies: IDependencies) => {
    const { usecases: { updateProfileUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body) {
                let result = await updateProfileUsecase(dependencies).execute(req.body);
                if (result) {
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json('Error while updating')
                }
            } else {
                return res.status(404).json('req body is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}