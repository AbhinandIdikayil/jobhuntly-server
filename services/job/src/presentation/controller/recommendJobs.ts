import { NextFunction, Request, Response } from "express"
import { recommendJobs } from "../../infrastructure/database/mongodb/repositories/recommendJobs"
import { ModifiedRequest } from "../../utils/verifyToken"


export const recommendJobsController = () => {
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            if (_id) {
                const recommendation = await recommendJobs(_id)

                console.log(recommendation)
                return res.status(200).json(recommendation)
            }
            return res.status(404).json('error')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}