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
exports.RabbitMQClient = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQClient {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    static getInstance() {
        if (!RabbitMQClient.instance) {
            RabbitMQClient.instance = new RabbitMQClient();
        }
        return RabbitMQClient.instance;
    }
    connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect(url);
                this.channel = yield this.connection.createChannel();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getChannel() {
        if (!this.channel) {
            throw new Error('rabbitqm channel not initialized');
        }
        return this.channel;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                yield this.channel.close();
            }
            if (this.connection) {
                yield this.connection.close();
            }
        });
    }
}
exports.RabbitMQClient = RabbitMQClient;
