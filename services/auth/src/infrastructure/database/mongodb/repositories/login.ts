import { UserEntity } from "../../../../domain/entities";
import { authModel } from "../models/authModel";



export const login = async (email: string, password: string): Promise<UserEntity | null> => {
    try {
        const user = await authModel.findOne({ email })
        if(user?.isBlocked){
            throw new Error('user has been blocked')
        }
        if (user) {
            if (await user?.matchPassword(password)) {
                return user as UserEntity
            } else {
                throw new Error('password is incorrect')
            }
        } else {
            throw new Error('user not found')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    } 
}