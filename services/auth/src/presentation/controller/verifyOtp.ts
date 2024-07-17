import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { messageHandler } from "../../infrastructure/rabbitmq/instance";
import { generateToken } from "../../utils/jwt/generateToken";


export const verifyOtpContoller = (dependencies: IDependencies) => {
    const { usecases: { verifyOtpUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { otp, name, email, password ,role } = req.body;
            console.log(req.body, 'reqeust body');
            let data = await verifyOtpUsecase(dependencies).execute(email,otp,name,password,role)
            if(data){
                await messageHandler.sendUserData(data)
                //! Iam using this same api for the forgotpassword otp also
                // ! In frontend iam passing a key as intention with true or a string
                if(req.body.intention) {
                    const response = {
                        name:data?.name,
                        email: data?.email,
                    }
                    return res.status(200).json(response)
                } else {
                    const response = {
                        name:data?.name,
                        email: data?.email,
                        isBlocked: data?.isBlocked,
                        role:data?.role
                    }

                    const token = generateToken({ _id: String(data?._id), email: data?.email, role: data?.role ?? '' })
                    return res.status(200).cookie('access_token',
                        token,{
                            httpOnly: true,
                            maxAge: 60 
                        }
                    ).json(response)
                }
            } else {
                throw new Error('some thing happened')
            }
        } catch (error) {
            next(error)
        }
    }
}