import { ConsumerService } from "../infrastructure/MQ/consumer";
import { RABBIT_MQ_URL } from "./config";


export const consumerService = new ConsumerService(RABBIT_MQ_URL)