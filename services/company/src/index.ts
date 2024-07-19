import { CONNECT_DB, RABBIT_MQ_URL } from "./config/config"
import { consumerService } from "./config/rabbitmq"

import app from "./presentation/server"


const startServer = async () => {
    try {
        app
        await CONNECT_DB()

        consumerService.start()

    } catch (error) {
        console.log(error)
        // process.exit(0) 
    }
}
 
startServer() 