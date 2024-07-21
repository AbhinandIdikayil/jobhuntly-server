import { CONNECT_DB, RABBIT_MQ_URL } from "./config/config"
import { consumerService } from "./config/rabbitmq"
import  './infrastructure/socket/index'
import { server , io } from "./presentation/server"


const startServer = async () => {
    try {
        await CONNECT_DB()
        server
        await consumerService.start()
        io.on('connection', (socket) => {
            console.log('New client connected')
            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })

    } catch (error) {
        console.log(error)
        // process.exit(0) 
    }
}
 
startServer() 