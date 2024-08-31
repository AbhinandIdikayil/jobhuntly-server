import * as tf from '@tensorflow/tfjs'
import { userModel } from '../model/userMode';
import { createSkillVector, getAllSkills } from './dataPrepration';
import { jobModel } from '../model/jobModel';
import path from 'path';
import 'tfjs-node-save'

export async function recommendJobs(userId: string, topN = 5,  threshold = 0.9) {
    const modelLoadPath = `file://${path.resolve(__dirname, '..', '..', '..', '..', '..', 'models', 'job-recommendation-model', 'model.json')}`;

    const model = await tf.loadLayersModel(modelLoadPath);

    const user = await userModel.findById(userId).select('skills');
    if (!user) {
        return null
    }

    const allSkills = await getAllSkills();
    const userVector = createSkillVector(user.skills.map(s => s), allSkills);
    const userTensor = tf.tensor2d([userVector]);
    const prediction = model.predict(userTensor) as tf.Tensor;

    // Fetch job data
    const jobs = await jobModel.find({});
    const jobVectors = jobs.map(job => createSkillVector(job.skills.map(s => s), allSkills));

    // Convert job vectors to tensor
    const jobTensor = tf.tensor2d(jobVectors);

    // Compute cosine similarity manually
    const userVectorNorm = tf.norm(prediction, 'euclidean', 1);
    const jobVectorsNorm = tf.norm(jobTensor, 'euclidean', 1);
    const dotProduct = tf.matMul(prediction, jobTensor, false, true);
    const similarity: any = dotProduct.div(tf.matMul(userVectorNorm.expandDims(1), jobVectorsNorm.expandDims(0)));

    // Get similarities and jobs
    const similarities = similarity.arraySync()[0];

    // Filter jobs by similarity threshold
    const filteredJobScores = jobs
        .map((job, index) => ({ job, score: similarities[index] }))
        .filter(js => js.score >= threshold)  // Only keep jobs with similarity >= threshold
        .sort((a, b) => b.score - a.score);   // Sort by descending score

    return filteredJobScores.map(js => js.job);

}