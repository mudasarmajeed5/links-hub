import { Document, Types } from "mongoose"
interface EmailCampaignSubType {
    campaign_title?: string,
    campaign_body?: string,
    campaign_status?: boolean
}
export interface IEmailCampaignSchema extends Document {
    userId: Types.ObjectId,
    smtp_config: {
        smtp_email?: string,
        smtp_app_password?: string,
        smtp_host?: string,
        smtp_port?: number
    },
    campaigns: {
        email_campaigns: EmailCampaignSubType[]
    }
}