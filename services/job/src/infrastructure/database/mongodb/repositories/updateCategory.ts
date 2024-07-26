import { CategoryEntity } from "../../../../domain/entities";
import { categoryModel } from "../model/categoryModel";


export const updateCategory = async (data:CategoryEntity): Promise<CategoryEntity | null> => {
    try {
        if(data){
            const category = await categoryModel.findByIdAndUpdate(
                data?._id,
                {
                    $set:{...data}
                },
                {
                    new: true
                }
            )
            console.log(category)
            if(category){
                return category as unknown as CategoryEntity
            } else {
                throw new Error('Error while updating')
            }
        } else {
            throw new Error('provide data')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}