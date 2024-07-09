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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const messageHandler_1 = require("../infratructure/rabbitmq/messageHandler");
const instance_1 = require("../infratructure/rabbitmq/instance");
const app = (0, express_1.default)();
app.use(express_1.default.json());
instance_1.RABBIT_MQ.connect(config_1.MQ_URL)
    .then(() => {
    console.log('RabbitMQ connection established');
    const messageHandler = new messageHandler_1.MessageHandler();
    messageHandler.setupConsumer(config_1.ROUTING_KEY)
        .then(() => console.log('Consumer setup completed'))
        .catch((error) => console.error('Error setting up consumer:', error));
    // Set up producer
    // const producerHandler = new ProducerHandler();
});
app.listen(config_1.PORT, () => {
    console.log(`
------------------------------------
- AUTH SERVICE IS RUNNING ON ${config_1.PORT}-
------------------------------------
        `);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield instance_1.RABBIT_MQ.close();
        console.log('RabbitMQ connection closed');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}));
exports.default = app;
