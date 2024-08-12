import { UserEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";


export const searchUsers = async (value: string): Promise<UserEntity[] | null> => {
    try {
        if (value) {
            const users = await userModel.find({
                $or: [{ name: { $regex: value, $options: 'i' } }, {email:value}]

            })
            if(users.length > 0) {
                return users as unknown as UserEntity[]
            } else {
                return []
            }
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}