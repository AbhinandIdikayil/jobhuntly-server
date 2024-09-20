import express, { Application } from 'express'
import { CLIENT_URL, PORT, ROUTING_KEY } from '../config/config';
import { routes } from '../infratructure/routes';
import { dependencies } from '../config/dependencies';
import cors from 'cors'
import errorHandler from '../utils/errorHandler';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import ev from 'events'
ev.EventEmitter.defaultMaxListeners = 15; // or any number higher than 11

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
console.log('_______-------------------- CLIENT',CLIENT_URL)
app.use(cors({
    origin: CLIENT_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))

app.use('/api/v1/user', routes(dependencies))

app.use(errorHandler)


const database = [];
app.post("/resume/create", async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;
    console.log(req.body)
    const workArray = JSON.parse(workHistory);
    const remainderText = () => {
        let stringText = "";
        for (let i = 0; i < workArray.length; i++) {
            stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
        }
        return stringText;
    };
    const prompt = `Generate a professional resume for:
    Name: ${fullName}
    Experience: ${currentLength}
    Position:${currentPosition}
    Usedtechonologies: ${currentTechnologies}
    WorkHistory:${remainderText}
    `;

    const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',
        { inputs: prompt },
        {
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const generatedResume = response.data[0].generated_text;

    res.json({ resume: generatedResume });
});



app.listen(PORT, () => {
    console.log(`
------------------------------------
- USER SERVICE IS RUNNING ON ${PORT}-
------------------------------------
        `)
})





export default app;