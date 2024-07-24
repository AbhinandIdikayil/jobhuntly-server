import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ModifiedRequest } from "../../utils/verifyToken";


export const getUserController = (dependencies: IDependencies) => {
    const { usecases: { getUserUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const {email} = req.user || {}
            if(email){
                const data = await getUserUsecase(dependencies).execute(email)
                if(data){
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('user not found')
                }
            } else {
                return res.status(404).json('pleae provide email')
            }
        } catch (error) {
            next(error)
        }
    }
}