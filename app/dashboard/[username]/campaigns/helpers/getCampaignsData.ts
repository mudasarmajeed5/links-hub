export const getUserCampaignsData = async (userId: string) => {
    const response = await fetch('/api/user/save-campaign',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "user-id": userId
            },
        }
    );
    const data = await response.json();
    return data;
}