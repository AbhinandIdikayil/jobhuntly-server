import express, { Application } from 'express'
import { PORT } from '../config/config';
import { routes } from '../infrastructure/router';
import { dependencies } from '../config/dependencies';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from '../utils/errorMiddleware';

const app:Application = express()

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/company',routes(dependencies))
app.use(errorHandler)


app.listen(PORT,() => {
    console.log(`
----------------------------------------
- COMPANY SERVICE IS RUNNING ON ${PORT}-    
----------------------------------------
        `)
})

export default app 