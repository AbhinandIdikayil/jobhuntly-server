import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from "../../utils/verifyToken";


export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { getCompany, updateProfile,
        updateSocialLinks, sendRequest, updateRequest } = controller(dependencies)

    router.route('/company').get(verifyToken, getCompany);

    router.route('/company-overview').post(verifyToken, updateProfile);

    router.route('/company-social').put(verifyToken, updateSocialLinks);

    router.route('/compnay-request').post(verifyToken, sendRequest);

    router.route('/accept-company').post(updateRequest)

    return router
}