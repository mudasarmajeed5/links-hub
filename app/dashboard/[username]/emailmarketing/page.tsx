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
        <div className='p-4 min-h-[90vh] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md'>
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <TableCaption className="text-gray-500 dark:text-gray-400">Feature is in the pipeline, not built fully yet.</TableCaption>
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow>
                <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Email</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Subscription Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {subscribers.map((subscriber, idx) => (
                <TableRow key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{idx+1}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{subscriber.email}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{subscriber.status}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-300">{subscriber.subscriptionDate}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    )
}

export default EmailMarketing