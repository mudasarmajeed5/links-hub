import mongoose, { Schema } from "mongoose";

const EmailCampaignSubSchema = new Schema({
    campaign_title: { type: String },
    campaign_body: { type: String },
    campaign_status: { type: Boolean },
},{
    timestamps: true,
})
const EmailCampaignSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    smtp_config: {
        smtp_email: { type: String },
        smtp_app_password: { type: String },
        smtp_host: { type: String },
        smtp_port: { type: Number },
    },
    campaigns: {
        email_campaigns: { type: [EmailCampaignSubSchema], required: true, default: [] }
    }
})
export default mongoose.models.EmailCampaign || mongoose.model("EmailCampaign",EmailCampaignSchema)

