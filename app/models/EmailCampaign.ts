import { Schema } from "mongoose";

const EmailCampaigns = new Schema({
    campaign_title: {type:String},
    campaign_body: {type:String},
    campaign_status: {type:Boolean},
})
export const EmailCampaignSchema  = new Schema({
    smtp_config: {
        smtp_email: {type:String},
        smtp_app_password: {type:String},
        smtp_host: {type:String},
        smtp_port: {type:Number},
    },
    campaigns:{
        email_campaigns: {type:[EmailCampaigns],required:true,default:[]}
    }
})
