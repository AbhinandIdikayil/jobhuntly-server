import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"



export const listSectorController = (dependencies: IDependencies) => {
    const { usecases: { listSectorUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await listSectorUsecase(dependencies).execute()
            if(result) {
                return res.status(200).json(result)
            } else {
                return res.status(404).json('sector is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}