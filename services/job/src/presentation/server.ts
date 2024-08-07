import express, { Application } from 'express'
import { corsOption, PORT } from '../config/config'
import cors from 'cors'
import { router } from '../infrastructure/routes'
import { dependencies } from '../config/dependencies'
import { cronJob } from '../infrastructure/cronJob'
import cookieParser from 'cookie-parser'
import errorHandler from '../utils/ErrorHandler'

const app:Application = express()

app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

cronJob(dependencies)


app.use('/api/v1/job',router(dependencies))
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`
-----------------------------------------
- JOB SERVICE STARTED RUNNING ON ${PORT}-     
-----------------------------------------
        `)
})

export default app