import { userModel } from "../model/userModel"



export const blockUser = async (email: string): Promise<boolean | null> => {
    try {
        if (email) {
            let user = await userModel.findOne({ email })
            console.log(user?.isBlocked,!user?.isBlocked)
            let blockedUser = await userModel.findOneAndUpdate(
                { email },
                {
                    $set: {
                        isBlocked: !user?.isBlocked
                    }
                },
                { new: true }
            )
            if (blockedUser) {
                return true
            } else {
                throw new Error('error while blocking')
            }
        } else {
            throw new Error('please provide email')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}