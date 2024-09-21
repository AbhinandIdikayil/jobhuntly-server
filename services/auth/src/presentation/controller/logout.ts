import { NextFunction, Request, Response } from "express"


export const logoutController = () => {
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            res.cookie('access_token', '', {
                maxAge:1,
                httpOnly:true,
                sameSite:'none', secure:true
            });
            res.cookie('refresh_token', '', {
                maxAge:1,
                httpOnly:true,
                sameSite:'none', secure:true
            });
            return res.status(200).json({message:"logout successfull"})
        } catch (error) {
            next(error)
        }
    }
}