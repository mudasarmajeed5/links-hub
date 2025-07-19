export type SMTPTYPE = {
    smtp_email: string
    smtp_app_password: string
    smtp_host: string
    smtp_port: number
}
export type CampaignType = {
    campaign_title: string,
    campaign_body: string, 
    campaign_status: boolean,
    createdAt?:Date,
    updatedAt?:Date,
}