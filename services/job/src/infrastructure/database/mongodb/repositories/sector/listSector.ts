import { SectorEntity } from "../../../../../domain/entities"
import { sectorModel } from "../../model/sectorModel"


export const listSector = async (): Promise<SectorEntity[] | null> => {
    try {
        const data = await sectorModel.aggregate([
            {
                $match:{isDeleted:false}
            },
            {
                $lookup:{
                    from:'jobs',
                    localField:'_id',
                    foreignField:'category',
                    as:'jobs'
                }
            },
            {
                $addFields: {
                    jobs: { $size: "$jobs" } // Add a new field 'jobsCount' with the length of 'jobs' array
                }
            }
        ])
        // let sectors = await sectorModel.find({isDeleted:false});
        if(data.length > 0){
            return data as SectorEntity[]
        } else {
            return []
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}