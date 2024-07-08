import express, { Application } from 'express'
import { PORT } from '../config/config';
import { routes } from '../infrastructure/routes';
import { dependencies } from '../config/dependencies';
import errorHandler from '../utils/common/errorHandler';
import cors from 'cors'



const port = PORT 

export class Server {
    private app: Application

    constructor() {
        this.app = express()
        this.setUp()
    }

    setUp() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({
            origin: 'http://localhost:5173', // Allow requests from this origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
            credentials: true // Allow cookies to be sent with requests
        }))
        this.app.use('/api/v1/auth', routes(dependencies));
        this.app.use(errorHandler)

        console.log(typeof port)
        this.app.listen(port,() => {`
----------------------------------
- AUTH SRV IS RUNNING ON ${port}  -
---------------------------------- 
        `})
    }

}


