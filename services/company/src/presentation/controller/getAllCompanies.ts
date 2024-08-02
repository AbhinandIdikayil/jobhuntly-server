import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const getAllCompanyContoller = (dependencies:IDependencies) => {
    const {usecases:{getAllCompanyUsecase}} = dependencies
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            const data = await getAllCompanyUsecase(dependencies).execute()
            if(data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('no data found')
            }
        } catch (error) {
            next(error)
        }
    }
}