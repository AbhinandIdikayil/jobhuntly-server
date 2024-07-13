import { Channel, ConsumeMessage } from "amqplib";
import { RabbitMQ } from "..";
import { consumeMessage } from "./handleMessage";

export async function startConsumer() {
    const Channel = await RabbitMQ.getChannel();
    // await consumeFromUSERQUEUE(Channel)
    console.log('consumer started running')

    await Channel.consume('USER', (msg: ConsumeMessage | null) => {
        if (msg) {
            try {
                if(msg.fields.routingKey == 'user' || msg.fields.routingKey == 'fg-ps-user') {
                    Channel.nack(msg)
                    return;
                }
                let parsed = JSON.parse(msg?.content.toString())
                console.log(msg.fields)
                let key = msg.fields.routingKey
                console.log(parsed)
                consumeMessage(parsed,key, Channel,msg)
                Channel.ack(msg)
            } catch (error) {
                console.log(error)
                Channel.nack(msg,false,false)
            }
        }
    }, { noAck: false })
}

async function consumeFromUSERQUEUE(channel: Channel): Promise<void> {
    const QUEUE = 'USER'
    const ROUTING_KEY = ['company']
    const EXCHANGE = 'direct_logs'

    
}