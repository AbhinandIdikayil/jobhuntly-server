import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import ErrorResponse from "../../utils/common/errorResponse";
import { signupValidation } from "../../utils/validator/signupValidator";
import { producerService } from "../../config/rabbitmq";






export const signupController = (dependencies: IDependencies) => {
    const { usecases: { signupUsecase } } = dependencies;
    return async (req: Request, res: Response , next:NextFunction) => {
        try {
            const {error , value} = signupValidation.validate(req.body);
            if(error){
                throw new Error(error?.message)
            }
            if(value){
                const result = await signupUsecase(dependencies).execute(value);
                console.log(result)
                if(result){

                    //! sending user email and otp to the notification service
                    // await messageHandler.sendEmail(result);
                    await producerService.publishToEmailQueue(result)

                    
                    return res.status(200).json(result)
                } else {
                    return res.status(400).json({'message':'something has happened'})
                }
            } else {
                return res.status(400).json({'message':"something happened"})
            }
        } catch (error) {
            next(error)
        }
    }
}