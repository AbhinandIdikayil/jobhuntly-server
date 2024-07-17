import e, { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ModifiedRequest } from "../../utils/verifyToken";




export const sendRequestController = (dependencies:IDependencies) => {
    const {usecases:{sendRequestUsecase}} = dependencies
    return async (req:ModifiedRequest , res:Response , next: NextFunction) => {
        try {
            const {_id,email, role} = req.user || {}
            console.log("hai----")
            const result = await sendRequestUsecase(dependencies).execute(_id,email)
            if(result){
                return res.status(200).json(true)
            } else {
                return res.status(400).json(false)
            }
        } catch (error) {
            next(error)
        }
    }
}