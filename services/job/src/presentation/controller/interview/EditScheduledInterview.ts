import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"


export const EditScheduledInterview = (dependencies:IDependencies) => {
    const {} = dependencies
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}