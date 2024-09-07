import * as tf from '@tensorflow/tfjs'


export function createModel(numSkills: number) {
    const model = tf.sequential();
    try {

        model.add(tf.layers.dense({
            units: 64,
            activation: 'relu',
            inputShape: [numSkills]
        }));

        model.add(tf.layers.dropout({
            rate: 0.2
        }));

        model.add(tf.layers.dense({
            units: 32,
            activation: 'relu'
        }));

        model.add(tf.layers.dropout({
            rate: 0.2
        }));

        model.add(tf.layers.dense({
            units: numSkills,
            activation: 'sigmoid'
        }));

        model.compile({
            optimizer: tf.train.adam(),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });

        return model;
    } catch (error) {
        console.log(error)
        return model
    }
}