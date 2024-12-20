import path from "path";
import { prepareData } from "../infrastructure/database/mongodb/repositories/dataPrepration";
import { createModel } from "./tf.model";
import fs from 'fs/promises'
import 'tfjs-node-save'
import * as tf from '@tensorflow/tfjs'

async function trainModel(model: tf.Sequential, userVectors: tf.Tensor2D, jobVectors: tf.Tensor2D) {
    try {

        const normalizedUserVectors = tf.div(userVectors, tf.norm(userVectors, 'euclidean'));
        const normalizedJobVectors = tf.div(jobVectors, tf.norm(jobVectors, 'euclidean'));

        const history = await model.fit(normalizedUserVectors, normalizedJobVectors, {
            epochs: 300,
            batchSize: 32,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch: number, logs: any) => {
                    if (epoch % 10 === 0) {
                        console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}, val_loss = ${logs.val_loss.toFixed(4)}, val_acc = ${logs.val_acc.toFixed(4)}`);
                    }
                },
            }
        });
        return history;
    } catch (error) {
        console.log(error)
    }

}

export async function main() {
    try {

        const { userVectors, jobVectors, users, jobs } = await prepareData();
        console.log(userVectors?.shape, jobVectors)
        const model = createModel(userVectors.shape[1]);
        const history = await trainModel(model, userVectors, jobVectors);

        // Create the models directory if it doesn't exist
        const modelDir = path.join(__dirname, '..', '..', 'models');
        await fs.mkdir(modelDir, { recursive: true });
        if (!model) {
            console.log('Model is not available');
            return null;
        }

        // Save the model
        const modelPath = `file://${path.resolve(modelDir, 'job-recommendation-model')}`;
        await model.save(modelPath);

        console.log(`Model saved to ${modelPath}`);
        // await model.save('file://../../models/job-recommendation-model');
    } catch (error) {
        console.log(error)
    }
}

