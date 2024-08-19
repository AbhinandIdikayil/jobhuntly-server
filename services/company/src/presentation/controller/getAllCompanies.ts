import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { filterPagination } from "../../domain/entities"



export const getAllCompanyContoller = (dependencies: IDependencies) => {
    const { usecases: { getAllCompanyUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const option: filterPagination = {
                page: (parseInt(req?.query?.page as string) - 1) || 0,
                pageSize: parseInt(req.query?.pageSize as string ?? 0),
                name: req.query?.name as string || null,
                category: req.query?.category as [string] ?? null,
            }
            console.log(option,req.query)
            const data = await getAllCompanyUsecase(dependencies).execute(option)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('no data found')
            }
        } catch (error) {
            next(error)
        }
    }
}