"use client";

import { useState } from "react";
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

const Campaigns = () => {
    const [campaigns] = useState([
        { id: "1", title: "Summer Gadget Sale" },
        { id: "2", title: "Back to School Tech Deals" },
        { id: "3", title: "New Arrivals: Smart Devices" },
        { id: "4", title: "Black Friday Tech Blast" },
        { id: "5", title: "Cyber Monday Exclusive Offers" },
        { id: "6", title: "Winter Clearance on Accessories" },
    ]);

    const [subscriberGroups] = useState([
        { id: "subscribers", label: "Subscribers" },
        { id: "all-users", label: "All Users" },
    ]);

    return (
        <div className="min-h-[80vh] p-6 bg-white dark:bg-[#151515] rounded-md shadow-md">
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
                                <Input placeholder="example@mail.com" name="smtp-email" />
                                <Input placeholder="App Password" name="smtp-app-password" />
                            </div>
                            <div className="flex gap-2">
                                <Input placeholder="i.e. smtp.zoho.com" name="smtp-host" />
                                <Input placeholder="PORT i.e. 587" name="smtp-port" />
                            </div>
                            <Button className="mt-2">Save Configuration</Button>
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
                                <Input placeholder="Campaign Title" className="w-[70%]" name="campaign-title" />
                                <div className="w-1/4">
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Textarea placeholder="Email Body..." name="campaign-body" rows={5} />
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Campaign to Edit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {campaigns.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>
                                            {c.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button className="mt-2">Save Campaign</Button>
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
                                    {campaigns.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.title}</TableCell>
                                            <TableCell>Active</TableCell>
                                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
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
                                <RadioGroup defaultValue={campaigns[0].id}>
                                    {campaigns.map((c) => (
                                        <div key={c.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={c.id} id={`campaign-${c.id}`} />
                                            <label htmlFor={`campaign-${c.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                {c.title}
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
    );
};

export default Campaigns;
