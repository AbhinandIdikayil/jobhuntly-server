import { CONNECT_DB, RABBIT_MQ_URL } from "./config/config"
import { RabbitMQ } from "./infrastructure/rabbitmq"
import { startConsumer } from "./infrastructure/rabbitmq/consumer"
import { consumeMessage } from "./infrastructure/rabbitmq/consumer/handleMessage"
import app from "./presentation/server"


const startServer = async () => {
    try {
        await RabbitMQ.connect(RABBIT_MQ_URL)
        app
        await CONNECT_DB()

        await startConsumer()

        process.on('SIGINT', async () => {
            console.log('Closing rabbitmq connection')
            await RabbitMQ.close()
            process.exit(0)
        })
        process.on('SIGTERM', async () => {
            console.log('Closing rabbitmq connection')
            await RabbitMQ.close()
            process.exit(0)
        })
    } catch (error) {
        console.log(error)
        process.exit(0) 
    }
}
 
startServer() 