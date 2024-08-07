import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const removeJobController = (dependencies:IDependencies) => {
    const {usecases:{removeJobUsecase}} = dependencies
    return async (req:Request , res:Response , next:NextFunction) => {
        try {
            const {id} = req.params
            if(!id) return res.status(404).json('id is null')
            const data = await removeJobUsecase(dependencies).execute(id)
        if(data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json('failed to delete')
        }
        } catch (error) {
            next(error)
        }
    }
}