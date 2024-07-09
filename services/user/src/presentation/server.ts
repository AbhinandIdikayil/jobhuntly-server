import express, { Application } from 'express'
import { MQ_URL, PORT, ROUTING_KEY } from '../config/config';
import { MessageHandler } from '../infratructure/rabbitmq/messageHandler';
import { RABBIT_MQ } from '../infratructure/rabbitmq/instance';



const app: Application = express();
app.use(express.json());


RABBIT_MQ.connect(MQ_URL)
    .then(() => {
        console.log('RabbitMQ connection established');
        const messageHandler = new MessageHandler();
        messageHandler.setupConsumer(ROUTING_KEY)
            .then(() => console.log('Consumer setup completed'))
            .catch((error) => console.error('Error setting up consumer:', error));


        // Set up producer
        // const producerHandler = new ProducerHandler();
    })

app.listen(PORT, () => {
    console.log(`
------------------------------------
- AUTH SERVICE IS RUNNING ON ${PORT}-
------------------------------------
        `)
})

process.on('SIGINT', async () => {
    try {
        await RABBIT_MQ.close();
        console.log('RabbitMQ connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});



export default app;