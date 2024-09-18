import * as tf from '@tensorflow/tfjs'


export function createModel(numSkills: number) {
    const model = tf.sequential();
    try {

        model.add(tf.layers.dense({
            units: 64,
            activation: 'relu',
            inputShape: [numSkills],
            kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
        }));
        model.add(tf.layers.dense({
            units: 32,
            activation: 'relu',
            kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
        }));
        model.add(tf.layers.dense({
            units: numSkills,
            activation: 'sigmoid',
            kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
        }));
        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
        return model;
    } catch (error) {
        console.log(error)
        return model
    }
}