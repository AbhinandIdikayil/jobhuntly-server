import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import ErrorResponse from "../../utils/common/errorResponse";
import { signupValidation } from "../../utils/validator/signupValidator";
import { RabbitMQ } from "../../infrastructure/rabbitmq";
import { MessageHandler } from "../../infrastructure/rabbitmq/messageHandler";


//! FOR RABBITMQ MESSAGE PRODUCER
const URL = process.env.RABBITMQ_URL || 'amqp://localhost'
const EXCHANGE = process.env.EXCHANGE || 'direct_logs'


const rabbitMQ = new RabbitMQ(URL,EXCHANGE)
const messageHandler = new MessageHandler(rabbitMQ)



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
                    await messageHandler.sendEmail(result)
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