import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import { IUser } from "@/types/Mongoose/UserModelType";
const UserLinksSchema = new Schema({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  link: { type: String, default: '' },
});
const emailSchema = new Schema({
  email: { type: String, required: true, },
  status: { type: String, required: true, default: 'subscribed' },
  subscriptionDate: { type: Date, required: true, default: Date.now }
}, { _id: false })
const EmailMarketingSchema = new Schema({
  emailList: { type: [emailSchema], default: [] },
  enableSignupForm: { type: Boolean, default: false },
  welcomeEmail: { type: String, default: "" },
  emailCampaignsRef: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "EmailCampaign"
  }
});

const SeoRankingSchema = new Schema({
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  keywords: { type: [String], default: [] },
  metaTags: { type: [String], default: [] },
});

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    password: { type: String, default: "" },
    name: { type: String, required: true },
    profilePic: { type: String, required: true },
    spotifyUrl: { type: String, default: "" },
    userLinks: { type: [UserLinksSchema], default: [] },
    viewCount: { type: Number, default: 0 },
    viewHistory: [
      {
        date: { type: String, required: true },
        views: { type: Number, required: true }
      }
    ],
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    userTheme: { type: Number, default: 1 },
    accentColor: { type: String, default: "#000000" },
    cta: {
      type: {
        text: String,
        icon: String,
        url: String,
      }, default: {
        text: "",
        icon: "",
        url: "",
      },
      _id: false,
    },
    emailMarketing: { type: EmailMarketingSchema, default: () => ({}) },
    seoRanking: { type: SeoRankingSchema, default: () => ({}) },
    isPremiumUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
