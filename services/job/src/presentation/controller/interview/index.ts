import { IDependencies } from "../../../application/interfaces/IDependencies";
import { EditScheduledInterview } from "./EditScheduledInterview";
import { scheduleInterviewController } from "./scheduleInterviewController";


export const interviewController = (dependencies:IDependencies) => {
    return {
        scheduleInterview:scheduleInterviewController(dependencies),
        editInterview:EditScheduledInterview(dependencies)
    }
}