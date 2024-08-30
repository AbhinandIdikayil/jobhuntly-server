import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { producerService } from "../../../config/rabbitmq"

export const scheduleInterviewController = (dependencies: IDependencies) => {
    const { usecases: { scheduleInterviewUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationID } = req.params
            const { date, time, type, roomId } = req.body
            console.log(req.body, req.params)
            if (applicationID && date && time && type) {
                const data = await scheduleInterviewUsecase(dependencies).execute(applicationID, time, date, type, roomId)
                if (data) {
                    await producerService.publishToEmailQueue({
                        user: data?.userId?.name,
                        company: data?.companyId?.name,
                        jobRole: data?.jobId?.jobTitle,
                        date,
                        time,
                        email: data?.userId?.email,
                        test: type,
                        role: 'interview'
                    })
                    return res.status(200).json({ _id: data?._id, schedule: data?.schedule || [] })
                } else {
                    return res.status(404).json('error while scheduling interview')
                }
            } else {
                return res.status(404).json('please provide every input')
            }
        } catch (error) {
            next(error)
        }
    }
}