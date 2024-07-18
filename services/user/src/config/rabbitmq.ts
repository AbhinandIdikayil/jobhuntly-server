import { ConsumserSevice } from "../infratructure/MQ/consumer";
import { ProducerService } from "../infratructure/MQ/publisher";
import { MQ_URL } from "./config";


export const consumer = new ConsumserSevice(MQ_URL);

// export const producer = new ProducerService(MQ_URL)