import { connectDB } from "./config/config"
import { startProducer } from "./config/rabbitmq"
import app from "./presentation/server"
// import { resumeAnalyzer } from "./utils/resumeAnalyzer";
// import { analyzeResume } from "./utils/resumeAnalyzer2";
import { main } from "./utils/tf.train";

const cloudinaryUrl = 'https://res.cloudinary.com/dghv07eag/image/upload/v1722945870/jobhunty/fazal_mpuocj.pdf';

const startServer = async () => {
    try {
        console.log(process.env.CLIENT_URL)
        // await resumeAnalyzer(cloudinaryUrl)
        // await analyzeResume(cloudinaryUrl)
        main().catch(console.error);
        app
        await connectDB()
        await startProducer()
    } catch (error) {
        console.log(error)
    }
}

startServer()