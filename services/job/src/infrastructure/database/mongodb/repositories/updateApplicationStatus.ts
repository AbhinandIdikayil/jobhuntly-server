import { ApplicantsEntity } from "../../../../domain/entities"
import { applicantModel } from "../model/applicantModel"

export const updateApplicationStatus = async (applicationId: string, hired?: boolean): Promise<ApplicantsEntity | null> => {
    try {

        const applicant = await applicantModel.findById(applicationId);
        if (!applicant) {
            throw new Error('Applicant not found');
        }
        console.log(hired)
        console.log(hired)

        if (hired == undefined) {
            const nextStatus = getNextHiringStatus(applicant?.hiring_status);

            const updatedApplicant = await applicantModel.findByIdAndUpdate(
                applicationId,
                { hiring_status: nextStatus },
                { new: true } // Return the updated document
            ).populate('companyId').populate('userId').populate('jobId');

            return updatedApplicant as unknown as ApplicantsEntity;
        } else {

            const status = hired ? 'hired' :'rejected'
            console.log(status)
            const updatedApplicant = await applicantModel.findByIdAndUpdate(
                applicationId,
                { hiring_status: status },
                { new: true } 
            ).populate('companyId').populate('userId').populate('jobId');
            return updatedApplicant as unknown as ApplicantsEntity;
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}


const getNextHiringStatus = (currentStatus: string) => {
    const statuses = ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'];
    const currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex < statuses.length - 1) {
        return statuses[currentIndex + 1];
    } else {
        return currentStatus; // If it's the last status, return the current one
    }
};
