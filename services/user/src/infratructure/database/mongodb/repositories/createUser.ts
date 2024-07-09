import { UserEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";



export const createUser =  async (data:UserEntity): Promise<UserEntity | null> => {
    try {
        console.log(data)
        const user = await userModel.create(data)
        if(user){
            let res = {
                ...user.toObject(),
                _id: user?._id.toHexString()
            }
            return res as UserEntity
        } else {
            throw new Error('user creation failed')
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}