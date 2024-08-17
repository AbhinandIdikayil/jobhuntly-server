import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"

export const scheduleInterviewController = (dependencies: IDependencies) => {
    const { usecases: { scheduleInterviewUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {applicationID} = req.params
            const {date, time, type } = req.body
            console.log(req.body,req.params)
            if (applicationID && date && time && type) {
                const data = await scheduleInterviewUsecase(dependencies).execute(applicationID, time, date, type)
                if (data) {
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('error while scheduling interview')
                }
            } else {
                return res.status(404).json('please provide every input')
            }
        } catch (error) {
            next(error)
        }
    }
}