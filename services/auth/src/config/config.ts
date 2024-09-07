import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export const PORT = Number(process.env.PORT)
export const maxAge = { maxAge: 60 * 60 * 24 * 1000 } //! for 1 day
export const refreshTokenMaxage = { maxAge: 60 * 60 * 24 * 30 * 1000 } //! for 30 days
console.log(PORT)


export const connectDB = async () => {
    try {
        let URL = process.env.MONGO_URI as string
        if (URL) {
            const res = await mongoose.connect(URL)
            if (res) {
                console.log(`
-----------------------------------
-     AUTH SRV MONGODB CONNECTED  -
-----------------------------------
                        `);
            }
        } else {
            console.log('uri is not accesible')
            process.exit(1)
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

