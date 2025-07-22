import { User } from "@/types/user-account";
export type Form = Omit<User, "_id" | "createdAt" | "updatedAt" | "__v" | "userLinks" | "userTheme" | "viewCount" | "viewHistory">;