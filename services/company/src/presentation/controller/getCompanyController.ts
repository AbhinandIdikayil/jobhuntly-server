import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"



export const getCompanyController = (dependencies:IDependencies) => {
    const { usecases:{getCompanyUsecase} } = dependencies
    return async (req:ModifiedRequest , res:Response , next: NextFunction) => {
        try {
            const {_id , email , role} = req.user || req.body
            if(_id) {
                let company = await getCompanyUsecase(dependencies).execute(email)
                if(company) {
                    return res.status(200).json(company)
                } else {
                    return res.status(400).json({'message':'somethign has happened'});
                }
            } else {
                throw new Error('unauthorized')
            }
        } catch (error) {
            next(error)
        }
    }
}