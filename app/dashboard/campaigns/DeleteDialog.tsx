"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdDelete } from "react-icons/md"
import { CampaignType } from "./helpers/types/campaign-types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { formatDate } from "@/utils/formatDate"
import { deleteCampaign } from "./helpers/deleteCampaign"
import { useState } from "react"
import { toast } from "sonner"
type DeleteDialogProps = {
    data: CampaignType[]
    sessionId: string | undefined
    getData: () => Promise<void>
}
const DeleteDialog = ({ data, getData,sessionId }: DeleteDialogProps) => {
    const [campaignTitle, setCampaignTitle] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const handleChange = (value: string) => {
        setCampaignTitle(value);
    };
    const handleDelete = async () => {
        if (!campaignTitle) {
            toast.error("Please select a campaign to delete");
            return;
        }
        setIsDeleting(true);
        const result = await deleteCampaign(campaignTitle, sessionId)
        if (result?.success) {
            toast.success(result.message)
            await getData();
            setIsDeleting(false);
        }
        else {
            toast.error(result?.message)
            setIsDeleting(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 mt-2 text-[16px] gap-1 flex items-center rounded-md text-white bg-red-600 hover:bg-red-500">
                <MdDelete /> <span> Delete a Campaign</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select a Campaign</DialogTitle>
                    <RadioGroup className="space-y-2" value={campaignTitle} onValueChange={handleChange}>
                        {data.map((campaign, idx) => (
                            <div key={idx} className="flex items-start space-x-2 p-3 border rounded-md">
                                <RadioGroupItem value={campaign.campaign_title} id={`campaign-${idx}`} />
                                <Label htmlFor={`campaign-${idx}`} className="flex w-full flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium mb-2">{campaign.campaign_title}</span>
                                        {campaign.campaign_status ? <span className="rounded-full bg-green-500 p-2"></span> : <span className="rounded-full bg-red-500 p-2"></span>}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{formatDate(campaign?.createdAt)}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <div className="text-right">
                        <button disabled={isDeleting} onClick={handleDelete} className="bg-red-600 px-2 py-1 rounded-md">
                            {isDeleting ? "Deleting" : "Delete"}
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog