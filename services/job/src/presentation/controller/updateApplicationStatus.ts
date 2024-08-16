import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { producerService } from "../../config/rabbitmq"

export const updateApplicationStatusController = (dependencies: IDependencies) => {
    const { usecases: { updateApplicationStatusUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationID } = req.params
            if (applicationID) {
                let data = await updateApplicationStatusUsecase(dependencies).execute(applicationID)
                if (data) {
                    if (data?.hiring_status == 'shortlisted') {
                        await producerService.publishToEmailQueue({
                            company: data?.companyId?.name,
                            email: data?.userId?.email,
                            jobRole: data?.jobId?.jobTitle,
                            role: 'shortlisted'
                        })
                    }
                    console.log({
                        companyEmail: data?.companyId?.email,
                        userEmail: data?.userId?.email,
                        jobRole: data?.jobId?.jobTitle,
                        role: 'shortlisted'
                    })
                    let response = {
                        _id: data?._id,
                        hiring_status: data?.hiring_status
                    }
                    return res.status(200).json(response)
                } else {
                    return res.status(404).json('error while updating status')
                }
            } else {
                return res.status(404).json('cant update application ID is missing')
            }
        } catch (error) {
            next(error)
        }
    }
}