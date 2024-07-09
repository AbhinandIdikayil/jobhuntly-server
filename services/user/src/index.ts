import { connectDB } from "./config/config"
import app from "./presentation/server"


const startServer = async () => {
    try {
        await connectDB()
        app
    } catch (error) {
        console.log(error)
    }
}

startServer()