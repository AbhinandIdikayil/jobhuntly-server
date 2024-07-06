import jwt from 'jsonwebtoken'


export const generateToken = (payload: { _id: string, email: string, role: string }) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('secret is undefined')
    }
    const { _id, email, role } = payload
    try {
        return jwt.sign({_id,email,role},secret,{expiresIn:'24h'})
    } catch (error) {
        throw new Error('failded to generate token')
    }
}