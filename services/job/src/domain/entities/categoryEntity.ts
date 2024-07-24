import { ObjectId } from "mongoose";


export interface CategoryEntity {
    _id:ObjectId,
    name: string,
    image: string,
    description: string,
    status:boolean
}