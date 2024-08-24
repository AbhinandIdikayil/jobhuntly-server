import { ProducerService } from "../infrastructure/rabbitmq/producer";
import { RABBITMQ_URL } from "./config";

export const producerService = new ProducerService(RABBITMQ_URL)

export const startProducer = async () => {
    await producerService.start()
    await producerService.close()
}