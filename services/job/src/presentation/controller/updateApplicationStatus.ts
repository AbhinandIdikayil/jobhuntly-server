import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const updateApplicationStatusController = (dependencies: IDependencies) => {
    const { usecases: { updateApplicationStatusUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationID } = req.params
            if (applicationID) {
                let data = await updateApplicationStatusUsecase(dependencies).execute(applicationID)
                if (data) {
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('error while updating status')
                }
            } else {
                return res.status(404).json('cant update application ID is missing')
            }
        } catch (error) {
            next(error)
        }
    }
}