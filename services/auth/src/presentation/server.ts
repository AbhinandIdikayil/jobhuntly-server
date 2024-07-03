import express, { Application } from 'express'
import { PORT } from '../config/config';
import { routes } from '../infrastructure/routes';
import { dependencies } from '../config/dependencies';
import errorHandler from '../utils/common/errorHandler';

const app:Application = express();

const port = PORT


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/auth',routes(dependencies));

app.use(errorHandler)

app.listen(port,() => {
    console.log(`
----------------------------------
- AUTH SRV IS RUNNING ON ${port}  -
----------------------------------
        `)
})

export default app