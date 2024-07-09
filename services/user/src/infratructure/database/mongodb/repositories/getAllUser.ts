import { UserEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";


export const getAllUser = async (): Promise<UserEntity[] | null> => {
    try {
        let users = await userModel.find()
        if(users.length > 0) {
            return users as unknown as UserEntity[]
        } else {
            throw new Error('no users found')
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}