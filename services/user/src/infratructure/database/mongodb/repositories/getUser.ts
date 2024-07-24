import { UserEntity } from "../../../../domain/entities"
import { userModel } from "../model/userModel"


export const getUser = async (email: string): Promise<UserEntity | null> => {
    try {
        const user = await userModel.findOne({email}).select('-password');
        if(user) {
            return user as unknown as UserEntity
        } else {
            throw new Error('user not found bitch')
        }
    } catch (error: any | Error) {
        throw new Error(error)
    }
}