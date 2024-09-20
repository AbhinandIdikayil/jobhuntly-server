import { CLIENT_URL, CONNECT_DB, RABBIT_MQ_URL } from "./config/config"
import { consumerService } from "./config/rabbitmq"
import  './infrastructure/socket/index'
import { server , io } from "./presentation/server"


const startServer = async () => {
    try {
        console.log('---------------------------- CLIENT',CLIENT_URL)
        await CONNECT_DB()
        server
        io.on('connection', (socket) => {
            console.log('New client connectedd')
            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
        await consumerService.start()
    } catch (error) {
        console.log(error)
        // process.exit(0) 
    }
}
 
startServer() 