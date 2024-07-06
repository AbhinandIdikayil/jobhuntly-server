import express, { Application } from 'express'
import {config} from 'dotenv'
config()

const app: Application = express();
const PORT = process.env.PORT



app.listen(PORT,() => {
    console.log(`
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
& NOTIFICATION SERVICE RUNNING ON PORT 7000 & 
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    `)
})