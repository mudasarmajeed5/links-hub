import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const SubscriberSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    plan: { type: String, enum: ["monthly", "yearly"], default: null },
    status: { type: String, enum: ["active", "cancelled", "past_due"], default: null },
    currentPeriodEnd: Date,
    isLifetime: { type: Boolean, default: false }
})
export default models.subscriptions || model("subscriptions", SubscriberSchema)