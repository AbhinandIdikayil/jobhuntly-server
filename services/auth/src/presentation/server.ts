import express, { Application } from 'express'
import { PORT } from '../config/config';
import { routes } from '../infrastructure/routes';
import { dependencies } from '../config/dependencies';
import errorHandler from '../utils/common/errorHandler';
import cors from 'cors'


const app: Application = express();

const port = PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))

app.use('/api/v1/auth', routes(dependencies));

app.use(errorHandler)

app.listen(port, () => { 
    console.log(`
----------------------------------
- AUTH SRV IS RUNNING ON ${port}  -
----------------------------------
        `)
})

export default app