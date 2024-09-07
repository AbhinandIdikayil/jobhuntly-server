import { NextFunction, Request, Response } from "express"
import { sendInterviewLinkMial } from "../infrastructure/rabbitmq/function/sendOtpMail"


export const controller = () => {
    return {
        sendInterviewStartedMail: (req:Request , res:Response ,next:NextFunction) => {
            console.log('hiiiiiiiiii')
            try {
                const {data} = req.body
                console.log(req.body)  
                let result = sendInterviewLinkMial(data)
                if(result) {
                    return res.status(200).json('Email sented successfully');
                } else {
                    return res.status(404).json('Couldnt send email')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}