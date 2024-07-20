import { connectDB } from "./config/config"
import { consumer, startProducer } from "./config/rabbitmq"
import app from "./presentation/server"


const startServer = async () => {
    try {
        await connectDB()
        app
        await consumer.start()
        await startProducer()
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

startServer()