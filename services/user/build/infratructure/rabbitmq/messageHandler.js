"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
const index_1 = require("./index");
const repositories_1 = require("../database/mongodb/repositories");
const EXCHANGE = 'direct_logs';
class MessageHandler {
    constructor() {
        this.channel = index_1.RabbitMQClient.getInstance().getChannel();
    }
    setupConsumer(ROUTING_KEY) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.channel.assertExchange(EXCHANGE, 'direct', { durable: false });
                const queue = yield this.channel.assertQueue('USER', { durable: false, exclusive: false });
                if (ROUTING_KEY.length > 0) {
                    for (const routing of ROUTING_KEY) {
                        yield this.channel.bindQueue(queue.queue, EXCHANGE, routing);
                    }
                    yield this.channel.consume(queue.queue, this.handleMessage.bind(this), { noAck: false });
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    handleMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (msg) {
                    const parsed = JSON.parse(msg.content.toString());
                    const routingKey = msg.fields.routingKey;
                    console.log(`Recieved message with${routingKey} and content-${parsed}`);
                    if (routingKey === 'company') {
                    }
                    else if (routingKey === 'user') {
                        let user = yield (0, repositories_1.createUser)({
                            name: parsed === null || parsed === void 0 ? void 0 : parsed.name,
                            email: parsed === null || parsed === void 0 ? void 0 : parsed.email,
                            password: parsed === null || parsed === void 0 ? void 0 : parsed.password,
                            role: parsed === null || parsed === void 0 ? void 0 : parsed.role
                        });
                        console.log(user, '-----------user saved -------------');
                    }
                    this.channel.ack(msg);
                }
            }
            catch (error) {
            }
        });
    }
}
exports.MessageHandler = MessageHandler;
