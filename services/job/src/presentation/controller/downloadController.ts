import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"

export const downloadController = (dependencies: IDependencies) => {
    const { usecases: { downloadHiredAndDeclinedCandidateUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            const data = await downloadHiredAndDeclinedCandidateUsecase(dependencies).execute(_id)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('No match found')
            }
        } catch (error) {
            next(error)
        }
    }
}