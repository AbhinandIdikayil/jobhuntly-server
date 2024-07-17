import jwt from 'jsonwebtoken'

const ACCESS = String(process.env.ACCESS_TOKEN_SECRET)
const REFRESH = String(process.env.REFRESH_TOKEN_SECRET)

export const generateToken = (payload: { _id: string, email: string, role: string }) => {
    
    console.log(REFRESH , ACCESS)
    const { _id, email, role } = payload
    try {  
        return jwt.sign({ _id, email, role }, ACCESS, { expiresIn: '24h' })
    } catch (error) {
        throw new Error('failded to generate token')
    }
}

export const generateRefreshToken = (payload: { _id: string, email: string, role: string }) => {

    const { _id, email, role } = payload
    try {
        return jwt.sign({ _id, email, role }, REFRESH, { expiresIn: '30d' })
    } catch (error) {
        throw new Error('failded to generate token')
    }
}