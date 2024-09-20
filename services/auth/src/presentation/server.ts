import express, { Application } from 'express'
import { PORT, ClIENT } from '../config/config';
import { routes } from '../infrastructure/routes';
import { dependencies } from '../config/dependencies';
import errorHandler from '../utils/common/errorHandler';
import cors from 'cors'
import morgan from 'morgan'
import { logger } from '../utils/logger';
import parser from 'cookie-parser'

const morganStream = {
    write: (message: any) => logger.info(message.trim()) // Log HTTP requests with Winston
};

const port = PORT

export class Server {
    private app: Application

    constructor() {
        this.app = express()
        this.setUp()
    }
    
    public setUp(): void {
        this.app.use(parser())
        this.app.use(morgan('combined', { stream: morganStream }));
        this.app.use(express.json())
        // this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors({
            origin: ClIENT, // Allow requests from this origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
            credentials: true // Allow cookies to be sent with requests
        }))
        console.log('------------------------- URL',ClIENT)
        this.app.use('/api/v1/auth', routes(dependencies));
        this.app.use(errorHandler)

        this.app.listen(port, () => console.log(`
----------------------------------
- AUTH SRV IS RUNNING ON ${port}  -
---------------------------------- 
        `))
    }

}


