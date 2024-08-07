import { UserEntity } from "../../../../domain/entities"
import { userModel } from "../model/userMode"


export const addUser = async (data: UserEntity) => {
    try {
        const user = await userModel.findOne({ email: data.email })
        if(user){
            const updated = await userModel.findOneAndUpdate(
                {email:data.email},
                {
                    $set:{
                        ...data
                    }
                },
                {
                    new : true
                }
            )
            if(updated){
                return updated as unknown as UserEntity
            } else {
                throw new Error('error while updating user')
            }
        } else {
            const user = userModel.create(data)
            if(user){
                return  user as unknown as UserEntity
            } else {
                throw new Error('error while creating user')
            }
        }
    } catch (error: Error | any) {
        throw new Error(error)
    }
}