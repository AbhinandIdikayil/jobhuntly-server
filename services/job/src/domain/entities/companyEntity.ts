import { ObjectId } from "mongoose";



export interface CompanyEntity {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    description?: string,
    contact?: string,
    officeLocations?: { name: string; icon: string }[],
    joinDate?: Date,
    industry?: string,
    images?: string[],
    benefits?: {
        icon: string;
        headline: string;
        description: string;
    }[],
    foundedDate?: Date,
    teams?: {
        name: string;
        profile: string;
        designation: string;
    }[],
    techStack?: { name: string; icon: string }[],
    website?: string,
    coverImage?: string,
    approvelStatus?: {
        status: "Accepted" | "Rejected" | "Pending" | "Message";
        description: string;
    },
    profileCompleted?: boolean,
    profileCompletionStatus?: "1%" | "2%" | "3%",
    socialLinks?: string[],
    icon?: string,
    LinkedInLink?: string,
    certificate?: string,
    registrationId?: string
}