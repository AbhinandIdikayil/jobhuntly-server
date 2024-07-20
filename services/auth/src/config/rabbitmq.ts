import { ConsumerService } from "../infrastructure/MQ/consumer";
import { ProducerService } from "../infrastructure/MQ/publisher";

const URL = process.env.RABBITMQ_URL || 'amqp://localhost'

export const producerService = new ProducerService(URL)
export const consumerService = new ConsumerService(URL)

export const startProducer = async () => {
    await producerService.start()
    await producerService.close()
}



