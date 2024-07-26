import { CategoryEntity } from "../../../../domain/entities";
import { categoryModel } from "../model/categoryModel";



export const deleteCategory = async (id: string): Promise<CategoryEntity | null> => {
    try {
        if (id) {
            let deletedCategory = await categoryModel.findById(id)
            if (deletedCategory) {
                deletedCategory.status = !deletedCategory.status;
                let res = await deletedCategory.save()
                if (res) {
                    return deletedCategory as unknown as CategoryEntity
                } else {
                    throw new Error('error while deleting')
                }

            } else {
                throw new Error('match not found')
            }
        } else {
            throw new Error('id is null')
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}
