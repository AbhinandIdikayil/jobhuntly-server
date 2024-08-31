import { Types } from "mongoose"
import { ApplicantsEntity } from "../../../../domain/entities"
import { applicantModel } from "../model/applicantModel"


export const downloadHiredAndRejectedCandidate = async (id: string): Promise<ApplicantsEntity[] | null> => {
    try {
        const applicants = await applicantModel.aggregate([
            {
                $match: {
                    companyId: new Types.ObjectId(id),
                    hiring_status: { $in: ['hired', 'rejected'] }
                }
            },
            {
                $lookup:{
                    from:'users',
                    foreignField:'_id',
                    localField:'userId',
                    as:'user'
                }
            },
            {
                $unwind:'$user'
            },
        ])
        console.log(applicants)
        return applicants as ApplicantsEntity[]
    } catch (error: any) {
        throw new Error(error?.message)
    }
}