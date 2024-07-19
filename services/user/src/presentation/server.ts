import express, { Application } from 'express'
import { PORT, ROUTING_KEY } from '../config/config';
import { routes } from '../infratructure/routes';
import { dependencies } from '../config/dependencies';
import cors from 'cors'


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))

app.use('/api/v1/user', routes(dependencies))



 
app.listen(PORT, () => {
    console.log(`
------------------------------------
- USER SERVICE IS RUNNING ON ${PORT}-
------------------------------------
        `)
})





export default app;