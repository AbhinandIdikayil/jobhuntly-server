import { UserEntity } from "../../../../domain/entities"
import { authModel } from "../models/authModel"
import { OtpModel } from "../models/otpModel"



export const verifyOtp = async (email:string,otp:string,name:string,password:string,role:string): Promise<UserEntity | null> => {
    try {
        if(!otp){
            throw new Error('where is otp')
        }
        const userOtp = await OtpModel.find({email}).sort({createdAt: -1}).limit(1)
        const user = userOtp[0]
        console.log(userOtp)
        if(user?.otp === Number(otp)){
            const user = await authModel.create({
                name,
                email,
                password,
                role
            })
            if(user){
                return user as UserEntity
            } else {
                throw new Error('error while signup')
            }
        } else {
            throw new Error('invalid otp')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}