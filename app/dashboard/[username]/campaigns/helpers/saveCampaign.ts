import { CampaignType } from "./types/campaign-types";

export async function saveCampaigns(data:CampaignType,userId:string){
    try {
        let response = await fetch('/api/user/save-campaign',
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...data,userId}),
            }
        )
        const result = await response.json();
        return result;
    } catch (error) {
        const err = error as Error;
        return err.message;
    }
}