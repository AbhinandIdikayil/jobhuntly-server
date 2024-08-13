import { connectDB } from "./config/connection"
import {server as app } from "./presentation/server"


const startServer = async () => {
    try {
        app
        await connectDB()
    } catch (error) {   
        console.log(error)
    }
}

startServer()