import { connectDB } from "./config/config"
import { consumerService, startProducer } from "./config/rabbitmq";
import { Server } from "./presentation/server";
 
const startServer = async () => {
    try {
        let server = new Server()
        await connectDB();
        await consumerService.start()
        await startProducer()
    } catch (error) {
        console.log(error)
    }
}

startServer(); 