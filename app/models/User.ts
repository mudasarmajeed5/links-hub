import mongoose from "mongoose";
const { Schema, model } = mongoose;
const UserLinks = new Schema({
    icon: { type: String, required: true },
    label: { type: String, required: true },
    link: { type: String, required: true },
})
const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: false, default: '' },
        name: { type: String, required: true },
        profilePic: { type: String, required: true },
        userLinks: { type: [UserLinks], default: [] },
        theme: { type: Number, default: 1 },
        isPremiumUser: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)
export default mongoose.models.User || model('User', UserSchema);
