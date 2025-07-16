export type EmailSubscriber = {
    email: string;
    status: 'subscribed' | 'unsubscribed' | 'bounced';
    subscriptionDate?: Date;
    _id: string;
};