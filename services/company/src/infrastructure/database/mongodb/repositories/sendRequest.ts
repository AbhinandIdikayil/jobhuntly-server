import { approvalModel } from "../model/Approval"
import { companyModel } from "../model/companyModel"




export const sendRequest = async (id: string,email: string) :Promise<boolean | null> => {
    try {
        if(id) {
            
            const data = await companyModel.findOne({email})
            if(data?.profileCompletionStatus){
                const isApproval = await approvalModel.findOne({companyId:data.id});
                if(isApproval) {
                    throw new Error('Request already sent')
                }
                const approval = await approvalModel.create({
                    companyId:data.id
                })
                if(approval){
                    return true
                } else {
                    throw new Error('error while creating approval')
                }
            } else {
                return false
            }
        } else {
            throw new Error('provide id')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}