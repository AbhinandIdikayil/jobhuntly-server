import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config()

export const transporter = nodemailer.createTransport({
    port: 465,
    service: 'Gmail',
    secure: true,
    logger: true,
    debug: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    // tls: {
    //     rejectUnauthorized: true
    // }
} as nodemailer.TransportOptions)