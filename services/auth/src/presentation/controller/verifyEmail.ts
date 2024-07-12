import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOTP } from "../../utils/common/generateOtp";
import { emailValidator } from "../../utils/validator/validator";
import { authModel } from "../../infrastructure/database/mongodb/models/authModel";



export const verifyEmailController = (dependencies: IDependencies) => {
    const { usecases: { verifyEmailUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            const { error, value } = emailValidator.validate(req.body)
            console.log(value)
            if (error) {
                throw new Error(error.message)
            }

            let otp = generateOTP()
            const data = await verifyEmailUsecase(dependencies).execute(value.email, otp)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('something happened')
            }
 
        } catch (error) {
            next(error)
        }
    }
}