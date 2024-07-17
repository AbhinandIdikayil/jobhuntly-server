import { NextFunction, Request, Response } from "express";


const errorHandler = (err:any,req:Request , res:Response , next:NextFunction) => {
    console.log(err)
    const statusCode = err.status || 500 

    console.log('middleware',err?.message,err.statusCode)
    return res.status(statusCode).json({
        status:err.statusCode,
        message:err.message || 'something happened'
    })
}


export default errorHandler