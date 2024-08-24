import nodemailer from 'nodemailer'
import { transporter } from '../../mailer/config'
import mailgen from 'mailgen'
import fs from 'fs'
import path from 'path'


let mailgenerator = new mailgen({
    theme: 'cerberus',
    product: {
        name: 'JobHunty',
        link: 'https://mailgen.js/'
    }
})

export const sendOtpToUser = (data: any) => {
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

export const sendShortListedEmail = (data: any) => {
    console.log('--------------', data);

    // Read the HTML template file
    const templatePath = path.join(__dirname, '../../../../templates/shortlisted.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    htmlContent = htmlContent.replace(/{{user}}/g, data.content.email);
    htmlContent = htmlContent.replace(/{{company}}/g, data.content.company);
    htmlContent = htmlContent.replace(/{{role}}/g, data.content.jobRole);


    let message = {
        from: process.env.EMAIL,
        to: data.content.email,
        subject: 'Your job application has been shortlisted',
        html: htmlContent
    };


    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info);
        }
    });
}

export const sendInterviewMail = (data: any) => {
    console.log('--------------', data);
    const templatePath = path.join(__dirname, '../../../../templates/interview.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    htmlContent = htmlContent.replace(/{{user}}/g, data?.content?.user);
    htmlContent = htmlContent.replace(/{{test}}/g, data?.content?.test);
    htmlContent = htmlContent.replace(/{{company}}/g, data?.content?.company);
    htmlContent = htmlContent.replace(/{{role}}/g, data?.content?.jobRole);
    htmlContent = htmlContent.replace(/{{date}}/g, data?.content?.date);
    htmlContent = htmlContent.replace(/{{time}}/g, data?.content?.time);

    let message = {
        from: process.env.EMAIL,
        to: data?.content?.email,
        subject: 'Your job application has been shortlisted',
        html: htmlContent
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info);
        }
    });
}

export const sendInterviewLinkMial = (data: any) => {
    const CLIENT_URL = process.env.CLIENT_URL as string
    console.log('--------------', data);
    const templatePath = path.join(__dirname, '../../../../templates/interviewLink.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    htmlContent = htmlContent.replace(/{{company}}/g, data?.company);
    htmlContent = htmlContent.replace(/{{link}}/g, CLIENT_URL + data?.link);
    htmlContent = htmlContent.replace(/{{room}}/g, data?.roomId);
    htmlContent = htmlContent.replace(/{{typeTest}}/g, data?.testType);
    htmlContent = htmlContent.replace(/{{user}}/g, data?.user);


    let message = {
        from: process.env.EMAIL,
        to: data?.email,
        subject: 'Your job application has been shortlisted',
        html: htmlContent
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return false
        } else {
            console.log('Email sent:', info);
            return true
        }
    });
    return false
}