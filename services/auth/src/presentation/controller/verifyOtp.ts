import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const verifyOtpContoller = (dependencies: IDependencies) => {
    const { usecases: { verifyOtpUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { otp, name, email, password ,role } = req.body;
            console.log(req.body, 'reqeust body');
            let data = await verifyOtpUsecase(dependencies).execute(email,otp,name,password,role)
            if(data){
                const response = {
                    name:data?.name,
                    email: data?.email,
                    isBlocked: data?.isBlocked,
                    role:data?.role
                }
                return res.status(200).json(response)
            } else {
                throw new Error('some thing happened')
            }
        } catch (error) {
            next(error)
        }
    }
}