import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";



export const listRequestController = (dependencies: IDependencies) => {
    const { usecases:{listRequestUsecase} } = dependencies
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            let data = await listRequestUsecase(dependencies).execute()
            if(data){
                return res.status(200).json(data)
            } else {
                return res.status(400).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

}