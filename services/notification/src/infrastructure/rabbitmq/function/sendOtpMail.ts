import nodemailer from 'nodemailer'
import { transporter } from '../../mailer/config'
import mailgen from 'mailgen'


export const sendOtpToUser = (data: any) => {
    console.log('--------------',data)
    let mailgenerator = new mailgen({
        theme: 'cerberus',
        product: {
            name: 'JobHunty',
            link: 'https://mailgen.js/'
        }
    })
    let response = {
        body: {
            name: `${data.content.email}`,
            intro: `Your otp is ${data.content.otp}`
        }
    }
    let mail = mailgenerator.generate(response);

    let message = {
        from: process.env.EMAIL,
        to: data.content.email,
        subject: 'your otp has been successfully sented',
        html: mail
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info);
        }
    });
}

const sendOtpToCompany = () => {

}