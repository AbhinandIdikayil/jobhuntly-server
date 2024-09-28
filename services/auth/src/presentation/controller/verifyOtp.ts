import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateRefreshToken, generateToken } from "../../utils/jwt/generateToken";
import { producerService } from "../../config/rabbitmq";
import { maxAge, refreshTokenMaxage } from "../../config/config";


export const verifyOtpContoller = (dependencies: IDependencies) => {
    const { usecases: { verifyOtpUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { otp, name, email, password, role } = req.body;
            console.log(req.body, 'reqeust body');
            let data = await verifyOtpUsecase(dependencies).execute(email, otp, name, password, role)
            if (data) {
                //! Iam using this same api for the forgotpassword otp and otp verification while signinng up
                // ! In frontend iam passing a key named as intention
                //! with true or a string to identify is it from forgotpassword
                if (req.body.intention) {
                    const response = {
                        name: data?.name,
                        email: data?.email,
                    }
                    return res.status(200).json(response)
                } else {
                    //$ HERE IAM SENDING THE AUTH DB DATA TO USER OR COMPANY SERVICE WHENEVER THE 
                    //$ OTP VERIFICATION IS SUCCESSFULL
                    await producerService.publishToUserQueue(data)
                    const response = {
                        name: data?.name,
                        email: data?.email,
                        isBlocked: data?.isBlocked,
                        role: data?.role
                    }

                    const token = generateToken({ _id: String(data?._id), email: data?.email, role: data?.role ?? '' })
                    const refreshToken = generateRefreshToken({ _id: String(data?._id), email: data?.email, role: data?.role ?? '' })
                    return res.status(200)
                        .cookie('access_token', token, {  httpOnly: true, sameSite:'none', secure:true,  maxAge: maxAge?.maxAge })
                        .cookie('refresh_token', refreshToken, { httpOnly: true, sameSite:'none', secure:true, maxAge: refreshTokenMaxage?.maxAge })
                        .json(response)
                }
            } else {
                throw new Error('some thing happened')
            }
        } catch (error) {
            next(error)
        }
    }
}