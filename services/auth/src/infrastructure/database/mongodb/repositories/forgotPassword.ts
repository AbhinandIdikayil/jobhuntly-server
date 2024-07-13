import { authModel } from "../models/authModel"


export const forgotPassword = async (email:string,password:string): Promise<any | null> => {
    try {
        if(email && password){
            let user = await authModel.findOne({email})
            if(user) {
               let updatedDoc = await user.updatePassword(password)
               if(updatedDoc) {
                    let response = {
                        role:user.role,
                        password : updatedDoc,
                        email:user.email,
                    }
                    return response
               } else {
                throw new Error('Couldnt update password')
               }
            } else {
                return false
            }
        } else {
            throw new Error('haii')
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}