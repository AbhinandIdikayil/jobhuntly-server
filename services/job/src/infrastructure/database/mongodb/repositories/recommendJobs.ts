import * as tf from '@tensorflow/tfjs'
import { userModel } from '../model/userMode';
import { createSkillVector, getAllSkills } from './dataPrepration';
import { jobModel } from '../model/jobModel';
import path from 'path';

export async function recommendJobs(userId: string, topN = 5, threshold = 0.75) {
    const modelLoadPath = `file://${path.resolve(__dirname, '..', '..', '..', '..', '..', 'models', 'job-recommendation-model', 'model.json')}`;

    const model = await tf.loadLayersModel(modelLoadPath);
    const user = await userModel.findById(userId).select('skills');
    if (!user) {
        return null
    }


    const allSkills = await getAllSkills();
    const userVector = createSkillVector(user.skills, allSkills);
    const userTensor = tf.tensor2d([userVector]);

    // Predict the embedding for the user
    const prediction: any = model.predict(userTensor) as tf.Tensor;
    const userEmbedding = prediction.arraySync()[0] as number[]; // Get the prediction as an array

    // Fetch job data
    const jobs = await jobModel.aggregate([
        {
            $lookup: {
              from: 'companies', // The name of the collection in MongoDB
              localField: 'companyId',
              foreignField: '_id',
              as: 'company'
            }
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'employment',
              foreignField: '_id',
              as: 'employmentDetails'
            }
          },
          {
            $lookup: {
              from: 'sectors',
              localField: 'category',
              foreignField: '_id',
              as: 'categoryDetails'
            }
          },
          {
            $unwind: {
                path: '$company',
                preserveNullAndEmptyArrays: true // Include jobs with no company info
            }
        },
        {
            $unwind: {
                path: '$employmentDetails',
                preserveNullAndEmptyArrays: true // Include jobs with no company info
            }
        },
        {
            $unwind: {
                path: '$categoryDetails',
                preserveNullAndEmptyArrays: true // Include jobs with no company info
            }
        },
    ]);
    const jobVectors = jobs.map(job => createSkillVector(job.skills, allSkills));

    // Convert job vectors to tensor
    const jobTensor = tf.tensor2d(jobVectors);

    // Normalize the user vector and job vectors
    const userEmbeddingTensor = tf.tensor1d(userEmbedding).div(tf.norm(tf.tensor1d(userEmbedding)));
    const jobEmbeddingTensor = jobTensor.div(tf.norm(jobTensor, 'euclidean', 1).expandDims(1));
    const epsilon = 1e-8; // Small value to prevent division by zero
    const userEmbeddingNorm = tf.norm(userEmbeddingTensor).add(epsilon);
    const jobEmbeddingNorm = tf.norm(jobEmbeddingTensor, 'euclidean', 1).add(epsilon);

    const [cosineSimilarities] = tf.matMul(userEmbeddingTensor.expandDims(0), jobEmbeddingTensor.transpose())
        .div(userEmbeddingNorm.mul(jobEmbeddingNorm)).arraySync() as number[][];
    // Calculate cosine similarity
    // const cosineSimilarities = tf.matMul(userEmbeddingTensor.expandDims(0), jobEmbeddingTensor.transpose()).arraySync()[0] as number[];;
    console.log('User vector:', userVector);
    console.log('User embedding:', userEmbedding);
    console.log('Job vectors:', jobVectors);
    console.log('Cosine similarities:', cosineSimilarities);
    // Filter jobs by similarity threshold
    const filteredJobScores = jobs
        .map((job, index) => ({ job, score: cosineSimilarities[index] }))
        .filter(js => js.score >= threshold)  // Only keep jobs with similarity >= threshold
        .sort((a, b) => b.score - a.score);   // Sort by descending score

    return filteredJobScores.map(js => js.job);

    // const user = await userModel.findById(userId).select('skills');
    // if (!user) {
    //     return null
    // }

    // const allSkills = await getAllSkills();
    // const userVector = createSkillVector(user.skills?.map(s => s), allSkills);
    // const userTensor = tf.tensor2d([userVector]);
    // const prediction = model.predict(userTensor) as tf.Tensor;

    // // Fetch job data
    // const jobs = await jobModel.find({});
    // const jobVectors = jobs.map(job => createSkillVector(job.skills?.map(s => s), allSkills));

    // // Convert job vectors to tensor
    // const jobTensor = tf.tensor2d(jobVectors);

    // // Compute cosine similarity manually
    // const userVectorNorm = tf.norm(prediction, 'euclidean', 1);
    // const jobVectorsNorm = tf.norm(jobTensor, 'euclidean', 1);
    // const dotProduct = tf.matMul(prediction, jobTensor.transpose());
    // const similarity: any = dotProduct.div(tf.matMul(userVectorNorm.expandDims(1), jobVectorsNorm.expandDims(0)));

    // // Get similarities and jobs
    // const similarities = similarity.arraySync()[0];

    // // Filter jobs by similarity threshold
    // const filteredJobScores = jobs
    //     .map((job, index) => ({ job, score: similarities[index] }))
    //     .filter(js => js.score >= threshold)  // Only keep jobs with similarity >= threshold
    //     .sort((a, b) => b.score - a.score);   // Sort by descending score

    // return filteredJobScores.map(js => js.job);

}