import { IDependencies } from "../../../application/interfaces/IDependencies";
import { scheduleInterviewController } from "./scheduleInterviewController";


export const interviewController = (dependencies:IDependencies) => {
    return {
        scheduleInterview:scheduleInterviewController(dependencies),
    }
}