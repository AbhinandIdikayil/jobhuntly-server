import { connectDB } from "./config/config"
import { messageHandler, rabbitMQ } from "./infrastructure/rabbitmq/instance";
import { Server } from "./presentation/server";
 
const startServer = async () => {
    try {
        let server = new Server()
        await connectDB();
        await messageHandler.startConsumer()
        process.on('SIGINT', async () => {
            await rabbitMQ.close()
        })
        process.on('SIGTERM', async () => {
            await rabbitMQ.close()
        })
    } catch (error) {
        console.log(error)
    }
}

startServer(); 