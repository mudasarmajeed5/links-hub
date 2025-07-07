import { SMTPTYPE } from "./types/campaign-types";

export async function saveSmtpConfig(data: SMTPTYPE,userId: string) {
    try {
        const response = await fetch('/api/user/smtp-config', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data,userId})
        })
        const result = await response.json();
        return result;
    } catch (error) {
        const err = error as Error;
        console.log("error saving smtp settings", err.message);
        return null;
    }
}