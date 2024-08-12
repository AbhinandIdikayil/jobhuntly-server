import mongoose from "mongoose"
import { MONGO_URI } from "./env"

                                            


export const connectDB = async () => {
    try {
        const isConnected = await mongoose.connect(MONGO_URI)
        if(isConnected){
            console.log(`
       _       _                                                                      _         _ 
 ___| |_ ___| |_    ___ ___ ___    _____ ___ ___ ___ ___    ___ ___ ___ ___ ___ ___| |_ ___ _| |
|  _|   | .'|  _|  |_ -|  _|  _|  |     | . |   | . | . |  |  _| . |   |   | -_|  _|  _| -_| . |
|___|_|_|__,|_|    |___|_| |___|  |_|_|_|___|_|_|_  |___|  |___|___|_|_|_|_|___|___|_| |___|___|
                                                |___|                                                                                                                                                                                                        
               `)
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}