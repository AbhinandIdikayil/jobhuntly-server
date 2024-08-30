import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { producerService } from "../../config/rabbitmq"

export const updateApplicationStatusController = (dependencies: IDependencies) => {
    const { usecases: { updateApplicationStatusUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationID } = req.params
            const {status} = req.body
            console.log(req.body,status)
            if (applicationID) {
                // if(!status){
                    let data = await updateApplicationStatusUsecase(dependencies).execute(applicationID,status)
                    if (data) {
                        if (data?.hiring_status == 'shortlisted') {
                            await producerService.publishToEmailQueue({
                                company: data?.companyId?.name,
                                email: data?.userId?.email,
                                jobRole: data?.jobId?.jobTitle,
                                role: 'shortlisted'
                            })
                        }
                        if(data?.hiring_status == 'interview') {
                            await producerService.publishToEmailQueue({
                                user:data?.userId?.name,
                                company:data?.companyId?.name,
                                jobRole:data?.jobId?.jobTitle,
                                // date:data?.,
                                // time:data?.,
                                email:data?.userId?.email,
                                role:'interview'
                            })
                        }
                        let response = {
                            _id: data?._id,
                            hiring_status: data?.hiring_status
                        }
                        return res.status(200).json(response)
                    } else {
                        return res.status(404).json('error while updating status')
                    }
                // } else {
                //     let data = await updateApplicationStatusUsecase(dependencies).execute(applicationID,status)
                //     if (data) {
                //         if (data?.hiring_status == 'shortlisted') {
                //             await producerService.publishToEmailQueue({
                //                 company: data?.companyId?.name,
                //                 email: data?.userId?.email,
                //                 jobRole: data?.jobId?.jobTitle,
                //                 role: 'shortlisted'
                //             })
                //         }
                //         if(data?.hiring_status == 'interview') {
                //             await producerService.publishToEmailQueue({
                //                 user:data?.userId?.name,
                //                 company:data?.companyId?.name,
                //                 jobRole:data?.jobId?.jobTitle,
                //                 // date:data?.,
                //                 // time:data?.,
                //                 email:data?.userId?.email,
                //                 role:'interview'
                //             })
                //         }
                //         let response = {
                //             _id: data?._id,
                //             hiring_status: data?.hiring_status
                //         }
                //         return res.status(200).json(response)
                //     } else {
                //         return res.status(404).json('error while updating status')
                //     }
                // }
            } else {
                return res.status(404).json('cant update application ID is missing')
            }
        } catch (error) {
            next(error)
        }
    }
}