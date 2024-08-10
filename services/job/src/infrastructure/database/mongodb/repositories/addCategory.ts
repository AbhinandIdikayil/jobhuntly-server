import { CategoryEntity } from "../../../../domain/entities";
import { categoryModel } from "../model/categoryModel";



export const addCategory = async (data:CategoryEntity): Promise<CategoryEntity | null> => {
    try {       
        if(data){
            const category = await categoryModel.create(data)
            if(category){
                return category as unknown as CategoryEntity
            } else {
                throw new Error('error while creating category');
            }
        } else {
            throw new Error('provide body')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}