import { connectDB } from "./config/connection"
import { CLIENT_URL } from "./config/env"
import {server as app } from "./presentation/server"


const startServer = async () => {
    try {
        console.log('--------------------------CLIENT',CLIENT_URL)
        app
        await connectDB()
    } catch (error) {   
        console.log(error)
    }
}

startServer()