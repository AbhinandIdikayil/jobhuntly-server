import express, { Application } from 'express'
import { PORT } from '../config/config';


const app:Application = express()

app.use(express.json());


// app.use('/api/v1/company')


app.listen(PORT,() => {
    console.log(`
----------------------------------------
- COMPANY SERVICE IS RUNNING ON ${PORT}-    
----------------------------------------
        `)
})

export default app 