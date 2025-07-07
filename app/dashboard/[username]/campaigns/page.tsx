"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import useFetchUser from "@/app/hooks/get-user-info";
import { useSession } from "next-auth/react";
import { saveSmtpConfig } from "./helpers/smtpconfig";
import { CampaignType, SMTPTYPE } from "./helpers/types/campaign-types";
import { toast } from "sonner";
import { saveCampaigns } from "./helpers/saveCampaign";
import { getUserCampaignsData } from "./helpers/getCampaignsData";

const Campaigns = () => {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [isPremium, setIsPremium] = useState(true);
    const { data } = useFetchUser(email ? { email } : { email: '' })
    const userId = data?._id?.toString();
    const [smtpSettings, setSmtpSettings] = useState<SMTPTYPE>({
        smtp_email: '',
        smtp_app_password: '',
        smtp_host: '',
        smtp_port: 0
    });
    const [campaign, setCampaign] = useState<CampaignType>({
        campaign_title: '',
        campaign_body: '',
        campaign_status: false,
    })
    const [campArray,setCampArray] = useState <CampaignType[]>([]);
    const getData = async(userId:string) =>{
        const result = await getUserCampaignsData(userId);
        const campaignSettings = result.data?.campaigns?.email_campaigns;
        const smtpSettings = result.data?.smtp_config;
        if(smtpSettings){
            setSmtpSettings(smtpSettings);
        }
        if(campaignSettings){
            setCampArray(campaignSettings);
        }
    }
    useEffect(() => {
        if (!session) {
            return
        }
        if (session.user && session.user.email) {
            setEmail(session.user.email);
        }
        if (data?.isPremiumUser) {
            setIsPremium(data?.isPremiumUser)
        }
        getData(userId? userId: '');
    }, [session]);


    const [subscriberGroups] = useState([
        { id: "subscribers", label: "Subscribers" },
        { id: "all-users", label: "All Users" },
    ]);
    const handleSmtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSmtpSettings((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeCampaign = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCampaign((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const saveSmtp = async () => {
        const result = await saveSmtpConfig(smtpSettings, userId ? userId : '');
        toast.success(result.message);
    };
    const handleSaveCampaign = async () => {
        const result = await saveCampaigns(campaign, userId ? userId : '');
        toast.info(result.message);
    }

    return (
        <div className="relative">
            {!isPremium && (
                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
                    <p className="text-center max-w-md mb-4">
                        Access email campaign tools and grow your audience. Subscribe to premium to unlock these features.
                    </p>
                    <Button onClick={()=>{router.push("/dashboard/loading")}} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                        Upgrade Now
                    </Button>
                </div>
            )}

            <div className="min-h-[80vh] relative z-0 p-6 bg-white dark:bg-[#151515] rounded-md shadow-md">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Campaigns</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Manage and send your email marketing campaigns.</p>

                <Tabs defaultValue="smtp" className="w-full">
                    <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800">
                        <TabsTrigger value="smtp">STMP Config</TabsTrigger>
                        <TabsTrigger value="build">Build Campaign</TabsTrigger>
                        <TabsTrigger value="active">Active Campaigns</TabsTrigger>
                        <TabsTrigger value="send">Send Campaign</TabsTrigger>
                    </TabsList>

                    {/* 1. Build Campaign */}
                    <TabsContent value="smtp">
                        <Card>
                            <CardHeader>
                                <CardTitle>SMTP Configuration</CardTitle>
                                <CardDescription>Configure your SMTP Settings.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input onChange={handleSmtpChange} value={smtpSettings.smtp_email} placeholder="example@mail.com" name="smtp_email" />
                                    <Input onChange={handleSmtpChange} value={smtpSettings.smtp_app_password} placeholder="App Password" name="smtp_app_password" />
                                </div>
                                <div className="flex gap-2">
                                    <Input onChange={handleSmtpChange} value={smtpSettings.smtp_host} placeholder="i.e. smtp.zoho.com" name="smtp_host" />
                                    <Input onChange={handleSmtpChange} value={smtpSettings.smtp_port} placeholder="PORT i.e. 587" name="smtp_port" />
                                </div>
                                <Button onClick={saveSmtp} className="mt-2">Save Configuration</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="build">
                        <Card>
                            <CardHeader>
                                <CardTitle>Build Campaign</CardTitle>
                                <CardDescription>Create a new campaign using a title, body, and template.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input onChange={handleChangeCampaign} value={campaign.campaign_title} placeholder="Campaign Title" className="w-[70%]" name="campaign_title" />
                                    <div className="w-1/4">
                                        <Select
                                            value={campaign.campaign_status.toString()}
                                            onValueChange={(value) =>
                                                setCampaign((prev) => ({
                                                    ...prev,
                                                    campaign_status: value === "true"
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Active</SelectItem>
                                                <SelectItem value="false">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>
                                <Textarea onChange={handleChangeCampaign} value={campaign.campaign_body} placeholder="Email Body..." name="campaign_body" rows={5} />
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Campaign to Edit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {campArray.map((c,id) => (
                                            <SelectItem key={id} value={`${id}`}>
                                                {c.campaign_title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleSaveCampaign} className="mt-2">Save Campaign</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 2. Active Campaigns */}
                    <TabsContent value="active">
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Campaigns</CardTitle>
                                <CardDescription>Review your saved campaigns.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date Created</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campArray.map((c,id) => (
                                            <TableRow key={id}>
                                                <TableCell>{c.campaign_title}</TableCell>
                                                <TableCell>{c.campaign_status ? "Active":"Invactive"}</TableCell>
                                                <TableCell>{c.createdAt && new Date(c.createdAt).toISOString().split("T")[0]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 3. Send Campaign */}
                    <TabsContent value="send">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send Campaign</CardTitle>
                                <CardDescription>Select a campaign and subscriber group to send to.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Select Campaign</h4>
                                    <RadioGroup defaultValue={campArray[0]?.campaign_title}>
                                        {campArray.map((c,idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <RadioGroupItem value={c.campaign_title} id={`campaign-${idx}`} />
                                                <label htmlFor={`campaign-${idx}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                    {c.campaign_title}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Target Subscriber Groups</h4>
                                    {subscriberGroups.map((group) => (
                                        <div key={group.id} className="flex items-center space-x-2">
                                            <Checkbox id={group.id} />
                                            <label htmlFor={group.id} className="text-sm text-gray-700 dark:text-gray-300">
                                                {group.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="default" className="mt-4">Send Campaign</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Campaigns;
