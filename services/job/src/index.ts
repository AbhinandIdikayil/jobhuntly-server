import { connectDB } from "./config/config"
import { startProducer } from "./config/rabbitmq"
import app from "./presentation/server"

const startServer = async () => {
    try {
        app
        await connectDB()
        await startProducer()
    } catch (error) {
        console.log(error)
    }
}

startServer()