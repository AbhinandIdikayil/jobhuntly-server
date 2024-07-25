import express, { Application } from 'express'
import { corsOption, PORT } from '../config/config'
import cors from 'cors'
import { router } from '../infrastructure/routes'
import { dependencies } from '../config/dependencies'
const app:Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOption))


app.use('/api/v1/job',router(dependencies))

app.listen(PORT,() => {
    console.log(`
-----------------------------------------
- JOB SERVICE STARTED RUNNING ON ${PORT}-     
-----------------------------------------
        `)
})

export default app