import { ConsumerService } from "../infrastructure/MQ/consumer";
import { ProducerService } from "../infrastructure/MQ/publisher";

const URL = process.env.RABBITMQ_URL || 'amqp://localhost'

export const producerService = new ProducerService(URL)

const startProducer = async () => {
    await producerService.start()
}

startProducer()
.then(() => {
    console.log('producer service started')
})
.catch(err => console.log(err))

// export const consumerService = new ConsumerService(URL)