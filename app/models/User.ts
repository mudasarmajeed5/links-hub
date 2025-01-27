import mongoose from "mongoose";
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    Userlinks: { type: Array, default: [] },
    theme:{type:Number,default:1},
    isPremiumUser:{type:Boolean,default:false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
export default mongoose.models.User || model('User', UserSchema);
