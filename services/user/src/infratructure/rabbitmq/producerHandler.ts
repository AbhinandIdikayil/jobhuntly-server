import { Channel } from "amqplib";
import { RabbitMQClient } from ".";


export class ProducerHandler {
    private channel : Channel;

    constructor() {
        this.channel = RabbitMQClient.getInstance().getChannel()
    }


    async publishMessage() {
        
    }
}