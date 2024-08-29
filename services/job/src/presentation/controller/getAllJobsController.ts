import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { dependencies } from "../../config/dependencies"
import { filterPagination } from "../../domain/entities"


export const getAllJobsController = (depependencies: IDependencies) => {
    const { usecases: { getAllJobsUsecase } } = depependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const option:filterPagination = {
                page: (parseInt(req?.query?.page as string) - 1) || 0,
                pageSize: parseInt(req.query?.pageSize as string ?? 5) ,
                name: req.query?.name as string || null ,
                category: req.query?.category as [string] ?? null ,
                employment: req.query?.employment as [string] ?? null ,
                price: req.query?.price  as [string] ?? [],
                location: req.query?.location as string
            }
            let data
            if (id) {
                data = await getAllJobsUsecase(dependencies).execute(id,option)
            } else {
                data = await getAllJobsUsecase(depependencies).execute('',option)
            }
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('data is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}