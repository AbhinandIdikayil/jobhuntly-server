import { ObjectId } from "mongoose";

export interface UserEntity {
    _id?:ObjectId,
    name:string,
    email:string,
    password:string,
    role?:string,
    isBlocked:boolean
}