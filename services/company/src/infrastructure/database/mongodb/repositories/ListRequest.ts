import { CompanyEntity } from "../../../../domain/entities"
import { approvalModel } from "../model/Approval"
import { CompanyDocument } from "../model/companyModel";



export const listRequest = async (): Promise<CompanyEntity | null> => {
    try {
        let requests = await approvalModel.find().populate<{ companyId: CompanyDocument }>('companyId');
        if(requests) {
            return requests as unknown as CompanyEntity
        } else {
            return requests
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}