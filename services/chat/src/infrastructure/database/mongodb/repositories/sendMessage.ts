import { MessageEntity } from "../../../../domain/entities"
import { messageModel } from "../model/MessageSchema"
import natural from 'natural'
const sentiment = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

export const sendMessage = async (data: MessageEntity): Promise<MessageEntity | null> => {
    try {
        if (data) {
            if (data?.content?.type == 'text') {
                const score = sentiment.getSentiment(data?.content?.content.split(' '));
                if (score < 0) throw new Error('Please dont use inappropriate words');
            }
            const message = await messageModel.create({
                ...data
            })
            if (message) {
                return message as unknown as MessageEntity
            } else {
                return null
            }
        } else {
            throw new Error('pleae enter input')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}