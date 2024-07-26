import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { producer } from "../../config/rabbitmq";


export const blockUserController = (dependencies:IDependencies) => {
    const { usecases:{blockUserUsecase} } = dependencies
    return async (req: Request , res:Response , next: NextFunction) => {
        try {
            const {email} = req.body
            if(!email) {
                throw new Error('provide email');
            }
            const data = await blockUserUsecase(dependencies).execute(email)
            if(data) {
                await producer.publishToUser(email);
                return res.status(200).json(data);
            } else {
                return res.status(404).json('something happened')
            }
        } catch (error) {
            next(error)
        }
    }
}