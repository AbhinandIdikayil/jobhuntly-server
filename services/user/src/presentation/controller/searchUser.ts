import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const searchUserController = (dependencies: IDependencies) => {
    const { usecases: { searchUsersUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const name = req.query?.name as string
            console.log(req.query)
            if (name) {
                let data = await searchUsersUsecase(dependencies).execute(name)
                if(data){
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('no users found')
                }
            } else {
                return res.status(404).json({message:'please provide name or email'})
            }   
        } catch (error) {
            next(error)
        }
    }
}