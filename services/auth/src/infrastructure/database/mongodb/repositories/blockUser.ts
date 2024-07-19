import { authModel } from "../models/authModel"


export const blockUser = async (email: string): Promise<void> => {
    try {
        const user = await authModel.findOne({email})
        if(user) {
            if(user.isBlocked) {
                user.isBlocked = false;
                await user.save()
                return 
            } else {
                user.isBlocked = true;
                await user.save()
                return
            }
        } else {
            throw new Error('user not found')
        }
    } catch (error: any | Error) {
        throw new Error(error?.response)
    }
}