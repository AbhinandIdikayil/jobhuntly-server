import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ModifiedRequest } from "../../utils/verifyToken";

export const getApplicantController = (dependencies: IDependencies) => {
    const { usecases: { getApplicantsUsecase } } = dependencies
    return async (req:ModifiedRequest , res:Response ,next:NextFunction) => {
        try {
            const {_id} = req.user
            if(!_id){
                return res.status(404).json('id is missing')
            }
            const data = await getApplicantsUsecase(dependencies).execute(_id)
            if(data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('failed to load data')
            }
        } catch (error) {
            next(error)
        }
    }

}