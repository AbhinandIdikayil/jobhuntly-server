import { UserEntity } from "../../../../domain/entities"
import { authModel } from "../models/authModel"




export const signup = async (data: UserEntity): Promise<UserEntity | null> => {
    try {
        const { email } = data
        let existingUser = await authModel.findOne({ email })
        if (existingUser) {
            throw new Error('user already exist')
        }
        const user = await authModel.create(data);
        if (user) {
            return user as UserEntity
        } else {
            throw new Error('signup failed')
        }
    } catch (error:any) {
        throw new Error(error?.message)
    }
}