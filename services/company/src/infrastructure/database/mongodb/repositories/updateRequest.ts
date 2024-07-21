import { approvalModel } from "../model/Approval"
import { CompanyDocument, companyModel } from "../model/companyModel"


export const updateRequest = async (email: string): Promise<{ email: string } | null> => {
    try {
        let company = await approvalModel.findOne({companyId:email }).populate<{ companyId: CompanyDocument }>('companyId');
        if (company) {
            let email = company?.companyId?.email

            await companyModel.findByIdAndUpdate(
                {_id:email},
                {
                    $set:{
                        approvalStatus: 'Accepted'
                    }
                },
                {new:true}
            )
            return {email}
        } else {
            throw new Error('error while updating')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}   