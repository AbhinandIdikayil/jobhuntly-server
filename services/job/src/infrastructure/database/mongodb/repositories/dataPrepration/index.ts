import { jobModel } from "../../model/jobModel";
import { SkillModel } from "../../model/skillsModel";
import { userModel } from "../../model/userMode";
import * as tf from '@tensorflow/tfjs'

export async function getAllSkills() {
  let data = await SkillModel.find({}).select('name')
  return data
}



export function createSkillVector(userSkills: string[], allSkills: any[]) {
  return allSkills?.map(skill => userSkills?.includes(skill?.name) ? 1 : 0)
}

export async function prepareData() {
  const allSkills: any[] = await getAllSkills();

  const users = await userModel.find({}).select('skills');
  const jobs = await jobModel.find({}).select('skills');

  // Create skill vectors for all users and jobs
  const userVectors = users.map(user => createSkillVector(user?.skills.map(s => s), allSkills));
  const jobVectors = jobs.map(job => createSkillVector(job?.skills?.map(s => s), allSkills));


  // Find the maximum number of samples
  const maxSamples = Math.max(userVectors.length, jobVectors.length);

  // Pad the user and job vectors to ensure equal number of samples
  const paddedUserVectors = Array.from({ length: maxSamples }, (_, i) => userVectors[i % userVectors.length]);
  const paddedJobVectors = Array.from({ length: maxSamples }, (_, i) => jobVectors[i % jobVectors.length]);

  return {
    userVectors: tf.tensor2d(paddedUserVectors),
    jobVectors: tf.tensor2d(paddedJobVectors),
    users,
    jobs
  };
}