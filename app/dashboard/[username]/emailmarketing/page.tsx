"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useFetchUser from '@/app/hooks/get-user-info';
import { useSession } from 'next-auth/react';
import TableSkeleton from "../../components/TableSkeleton";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date-time/formatDate";

// Define Type for Email Items
type EmailItem = {
    email: string;
    subscriptionDate: string;
    status: "subscribed" | "bounced" | "unsubscribed";
};

const EmailMarketing = () => {
    const { data: session } = useSession();
    const [emailsList, setEmailsList] = useState<EmailItem[]>([]);
    const email = session?.user?.email || '';

    const { data, error, loading } = useFetchUser(email ? { email } : { email: '' });
    useEffect(() => {
        if (!data?.emailMarketing?.emailList) return;
        const formattedEmailList: EmailItem[] = data.emailMarketing.emailList.map(
            (emailItem: EmailItem) => ({
                email: emailItem.email,
                subscriptionDate: emailItem.subscriptionDate,
                status: emailItem.status,
            })
        );
    
        setEmailsList(formattedEmailList);
    }, [data]);
    

    const handleSortEmails = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortByValue = event.target.value;
        const emailList: EmailItem[] = data?.emailMarketing?.emailList || [];
    
        const filteredArray = emailList.filter(
            (emailItem) => sortByValue === "all" || emailItem.status === sortByValue
        );
    
        setEmailsList(filteredArray);
    };
    if (loading) {
        return <TableSkeleton />;
    }
    
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='p-4 min-h-[90vh] overflow-auto bg-white dark:bg-gray-800 shadow-md'>
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                    Feature is in the pipeline, not built fully yet.
                </TableCaption>
                <TableHeader className="bg-gray-50 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Email</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            <label htmlFor="sortby">Sort By: </label>
                            <select onChange={handleSortEmails} name="sortby" id="sortby" defaultValue={"all"}>
                                <option value="all">All</option>
                                <option value="bounced">Bounced</option>
                                <option value="unsubscribed">Unsubscribed</option>
                                <option value="subscribed">Subscribed</option>
                            </select>
                        </TableHead>
                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Subscription Date
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {emailsList.length == 0 && <TableRow>
                        <TableCell className="whitespace-nowrap">Null</TableCell>    
                        <TableCell className="whitespace-nowrap">--------------------</TableCell>    
                        <TableCell className="whitespace-nowrap">Data not available</TableCell>    
                        <TableCell className="whitespace-nowrap text-right">---------</TableCell>    
                    </TableRow>}
                    {emailsList.map((emailItem, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                {idx + 1}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {emailItem.email}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-500 dark:text-gray-300">
                                {emailItem.status}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-300">
                                {formatDate(emailItem.subscriptionDate)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmailMarketing;
