import { UserEntity } from "../../../../domain/entities";
import { generateRandomString } from "../../../../utils/password/generatePassword";
import { authModel } from "../models/authModel";



export const googleAuth = async (email: string,name:string,role: string): Promise<UserEntity | null> => {
    try {
        let user = await authModel.findOne({email});
        if(!user) {
            user = await authModel.create({
                name,
                email,
                role,
                password:generateRandomString(),
            })
        }
        return user as UserEntity
    } catch (error: any | Error) {
        console.log(error)
        throw new Error(error.message)
    }
}