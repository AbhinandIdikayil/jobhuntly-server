import { CompanyEntity, filterPagination } from "../../../../domain/entities";
import { companyModel } from "../model/companyModel";


export const getAllCompany = async (option?: filterPagination): Promise<CompanyEntity[] | null> => {
    try {
        // const companies = await companyModel.find()
        const companies = await companyModel.aggregate([
            {
                $match: {
                    ...(option?.name ? {
                        name: {
                            $regex: option?.name, // Search term
                            $options: 'i' // Case-insensitive search
                        }
                    } : {}),
                    ...(option?.category?.length ? {
                        $or: option.category.map(category => ({
                            industry: {
                                $regex: new RegExp(`^${category}$`, 'i') // Case-insensitive match for each category
                            }
                        }))
                    } : {}),
                },
            },
            {
                $facet: {
                    companies: [
                        { $skip: (option?.page || 0) * (option?.pageSize || 5) },
                        { $limit: option?.pageSize || 5 }
                    ],
                    totalCount: [
                        { $count: 'count' }
                    ]
                }
            }
        ])
        console.log(companies)
        if (companies.length > 0) {
            return companies[0] as CompanyEntity[]
        } else {
            return []
        }
    } catch (error: Error | any) {
        throw new Error(error)
    }
}