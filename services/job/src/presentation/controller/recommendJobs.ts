import { NextFunction, Request, Response } from "express"
import { recommendJobs } from "../../infrastructure/database/mongodb/repositories/recommendJobs"


export const recommendJobsController = () => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            console.log('HII',req.params)
            const {userId}  = req.params
            if(userId){
                const recommendation = await recommendJobs(userId)

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