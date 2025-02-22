import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const UserLinksSchema = new Schema({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  link: { type: String, required: true },
});

const EmailMarketingSchema = new Schema({
  emailList: { type: [String], default: [] },
  enableSignupForm: { type: Boolean, default: true },
  welcomeEmail: { type: String, default: "" },
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
    profilePic: { type: String, required: true }, // Renamed for consistency
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
    accentColor: { type: String, default: "#000000" }, // Default to black
    cta: { type: String, default: "" },
    emailMarketing: { type: EmailMarketingSchema, default: () => ({}) },
    seoRanking: { type: SeoRankingSchema, default: () => ({}) },
    isPremiumUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export the model
export default models.User || model("User", UserSchema);
