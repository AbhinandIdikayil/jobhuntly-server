import { ObjectId } from "mongoose";


export interface CategoryEntity {
    _id:string,
    name: string,
    image: string,
    description: string,
    status:boolean
}