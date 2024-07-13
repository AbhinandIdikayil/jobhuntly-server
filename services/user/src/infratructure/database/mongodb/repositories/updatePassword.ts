import { userModel } from "../model/userModel"


export const updatePassword = async (newPassword: string, email: string): Promise<boolean> => {
    try {
        if (newPassword) {
            const user = await userModel.findOne({ email })
            if (user) {
                user.password = newPassword
                await user.save()
                return true
            } else {
                return false
            }
        }{
            throw new Error('password is required--repo')
        }
    } catch (error: any) {
        throw new Error(error)
    }
}