
import { CategoryEntity } from "../../../../../domain/entities";
import { categoryModel } from "../../model/categoryModel";



export const listCategory = async () : Promise<CategoryEntity[] | null> => {
    try {
        const data = await categoryModel.find()
        if(data.length > 0){
            return data as unknown as CategoryEntity[]
        } else {
            return []
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}