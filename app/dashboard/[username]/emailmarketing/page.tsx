import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
const EmailMarketing = () => {
    const subscribers = [
        {
            email: "john.doe@example.com",
            subscriptionDate: "2024-02-20",
            status: "Active",
        },
        {
            email: "jane.smith@example.com",
            subscriptionDate: "2024-02-18",
            status: "Unsubscribed",
        },
        {
            email: "michael.johnson@example.com",
            subscriptionDate: "2024-02-15",
            status: "Active",
        },
        {
            email: "emily.wilson@example.com",
            subscriptionDate: "2024-02-10",
            status: "Bounced",
        },
        {
            email: "david.brown@example.com",
            subscriptionDate: "2024-02-05",
            status: "Active",
        },
        {
            email: "sarah.miller@example.com",
            subscriptionDate: "2024-02-01",
            status: "Unsubscribed",
        },
        {
            email: "chris.evans@example.com",
            subscriptionDate: "2024-01-28",
            status: "Active",
        }
    ];


    return (
        <div className='p-4 min-h-[90vh] overflow-auto'>
            <Table>
                <TableCaption>Feature is in the pipeline, not built fully yet.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Subscription Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscribers.map((subscriber, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{idx+1}</TableCell>
                            <TableCell>{subscriber.email}</TableCell>
                            <TableCell>{subscriber.status}</TableCell>
                            <TableCell className="text-right">{subscriber.subscriptionDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EmailMarketing