import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"


export const EditScheduledInterview = (dependencies: IDependencies) => {
    const { usecases: { editInterviewUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationID } = req.params
            const { date, time, type, room, ind } = req.body
            const data = await editInterviewUsecase(dependencies).execute(applicationID, { date, time, type, room }, ind)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('Error while updating interview')
            }
        } catch (error) {
            next(error)
        }
    }
}