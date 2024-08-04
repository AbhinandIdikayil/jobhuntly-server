import { IDependencies } from "../../application/interfaces/IDependencies";
import {expiredJobs} from './updateExpiredJobs'

export const cronJob = (dependencies:IDependencies) => ({
    updateExpiredJobsCron:expiredJobs(dependencies)
})