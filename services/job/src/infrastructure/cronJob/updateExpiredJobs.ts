import cron from 'node-cron'
import { IDependencies } from '../../application/interfaces/IDependencies';

export const expiredJobs =  (dependencies: IDependencies) => {
    const { repositories: { updateExpiredJobs } } = dependencies
    try {
        cron.schedule('*/30 * * * *',async  () => {
            console.log('ihiii')
            await updateExpiredJobs()
        });
    } catch (error) {
        console.log(error)
    }
}

