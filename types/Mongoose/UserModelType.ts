import { Document, Types } from "mongoose";

interface UserLinksType {
  icon: string;
  label: string;
  link?: string;
}

interface EmailSchemaType {
  email: string;
  status?: "subscribed" | "unsubscribed" | "bounced";
  subscriptionDate?: Date;
}

interface EmailMarketingType {
  emailList?: EmailSchemaType[];
  enableSignupForm?: boolean;
  welcomeEmail?: string;
  emailCampaignsRef?: Types.ObjectId | null;
}

interface SeoRankingType {
  name?: string;
  description?: string;
  keywords?: string[];
  metaTags?: string[];
}

export interface ViewHistoryEntry {
  date: string;
  views: number;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  username: string;
  bio?: string;
  password?: string;
  name: string;
  profilePic: string;
  spotifyUrl?: string;
  userLinks?: UserLinksType[];
  viewCount?: number;
  viewHistory?: ViewHistoryEntry[];
  theme?: "light" | "dark";
  userTheme?: number;
  accentColor?: string;
  cta?: string;
  emailMarketing?: EmailMarketingType;
  seoRanking?: SeoRankingType;
  isPremiumUser?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
