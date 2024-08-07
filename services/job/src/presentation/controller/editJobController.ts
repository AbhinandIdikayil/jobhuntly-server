import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const editJobController = (dependencies:IDependencies) => {
    const {usecases:{editJobUsecase}} = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            const {data} = req.body
            if(id && data) {
                const job = await editJobUsecase(dependencies).execute(id,data)
                if(job){
                    return res.status(200).json(job)
                } else {
                    return res.status(404).json('error while editing job')
                }
            } else {
                return res.status(404).json('please provide the data')
            }
        } catch (error) {
            next(error)
        }
    }
}