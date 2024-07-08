import { connectDB } from "./config/config"
import { Server } from "./presentation/server";

const startServer = async () => {
    try {
        let server = new Server()


        await server.setUp()

        
        await connectDB(); 
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

startServer();