import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config()

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    // logger: true,
    // debug: true,
    // secureConnection: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: true
    }
} as nodemailer.TransportOptions)