import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"


export const addSectorController = (dependencies: IDependencies) => {
    const { usecases: { addSectorUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {data} = req.body
            if(data){
                const result = await addSectorUsecase(dependencies).execute(data)
                if(result) {
                    return res.status(200).json(result)
                } else {    
                    return res.status(404).json('something happened')
                }
            } else {
                return res.status(404).json('input is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}