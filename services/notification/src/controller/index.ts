import { NextFunction, Request, Response } from "express"


export const controller = () => {
    return {
        sendInterviewStartedMail: async (req:Request , res:Response ,next:NextFunction) => {
            try {
                const {data} = req.body
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}