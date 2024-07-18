import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const blockUserController = (dependencies:IDependencies) => {
    const { usecases } = dependencies
    return async (req: Request , res:Response , next: NextFunction) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}