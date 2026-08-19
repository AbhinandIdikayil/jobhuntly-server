import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { verifyToken } from './utils/verify';
import parser from 'cookie-parser'
const app: Application = express()
const port = process.env.PORT || 8000;

const services = {
    auth: process.env.AUTH_SERVICE_URI || 'http://localhost:2000/api/v1/auth',
    chat: process.env.CHAT_SERVICE_URI || 'http://localhost:3000/api/v1/chat',
    company: process.env.COMPANY_SERVICE_URI || 'http://localhost:4000/api/v1/company',
    job: process.env.JOB_SERVICE_URI || 'http://localhost:5000/api/v1/job',
    notification: process.env.NOTIFICATION_SERVICE_URI || 'http://localhost:6000/api',
    user: process.env.USER_SERVICE_URI || 'http://localhost:7000/api/v1/user', 
};

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(parser());
app.use(cors(corsOptions));


app.use('/api/v1/auth', createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
}));

app.use('/api/v1/chat', createProxyMiddleware({
    target: services.chat,
    changeOrigin: true,
}));

app.use('/api/v1/company', createProxyMiddleware({
    target: services.company,
    changeOrigin: true,

}));

app.use('/api/v1/job', createProxyMiddleware({
    target: services.job,
    changeOrigin: true,
}));

app.use('/api/v1/user', createProxyMiddleware({
    target: services.user,
    changeOrigin: true,
}));


app.use('/api', createProxyMiddleware({
    target: services.notification,
    changeOrigin: true,
}));


app.listen(port, () => {
    console.log('Gateway running successfully');
});