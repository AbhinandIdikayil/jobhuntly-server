import { Router } from "express"
import { controller } from "../../controller"


export const router = () => {
    const route = Router()
    const { sendInterviewStartedMail } = controller()
    route.route('/interview-link').put(sendInterviewStartedMail)
    return route
}