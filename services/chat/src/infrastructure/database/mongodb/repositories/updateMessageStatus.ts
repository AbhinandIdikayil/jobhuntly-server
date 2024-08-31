import { messageModel } from "../model/MessageSchema"

export const updateMessageStatus = async ({ id, status }:{id: string,status:string}) => {
    try {
        const updated = await messageModel.findByIdAndUpdate({ _id:id }, { status }, { new: true })
        if(updated){
            return updated
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}