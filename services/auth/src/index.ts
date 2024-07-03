import { connectDB } from "./config/config"
import app from "./presentation/server"


const startServer = async () => {
    try {
        app
        await connectDB();
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

startServer();