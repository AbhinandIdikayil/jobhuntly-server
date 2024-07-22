import { approvalModel } from "../model/Approval"
import { CompanyDocument, companyModel } from "../model/companyModel"


export const updateRequest = async (id: string,status: string): Promise<{ email: string , status: string } | null> => {
    try {
        let company = await approvalModel.findOne({companyId:id }).populate<{ companyId: CompanyDocument }>('companyId');
        if (company) {
            let email = company?.companyId?.email

            await companyModel.findByIdAndUpdate(
                {_id:id},
                {
                    $set:{
                        approvalStatus: status 
                    }
                },
                {new:true}
            )
            return {email,status}
        } else {
            throw new Error('error while updating')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}   