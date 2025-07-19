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
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date-time/formatDate";
import Pagination from "./components/Pagination";
import { useUserStore } from "@/store/useUserStore";
type EmailItem = {
    email: string;
    subscriptionDate: string;
    status: "subscribed" | "bounced" | "unsubscribed";
};

const EmailMarketing = () => {
    const { user } = useUserStore();
    const [emailsList, setEmailsList] = useState<EmailItem[] | undefined>([]);
    const [currentEmailsList, setCurrentEmailsList] = useState<EmailItem[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [emailsPerPage, setEmailsPerPage] = useState<number>(8);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    useEffect(() => {
        setEmailsList(user?.emailMarketing?.emailList)
    }, []);

    useEffect(() => {
        const indexOfLastItem = currentPage * emailsPerPage;
        const indexOfFirstItem = indexOfLastItem - emailsPerPage;
        const slicedData = emailsList?.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentEmailsList(slicedData);
        setEmailsPerPage(10);
    }, [emailsList, currentPage]);

    const handleSortEmails = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortByValue = event.target.value;
        const emailList: EmailItem[] = user?.emailMarketing?.emailList || [];

        const filteredArray = emailList.filter(
            (emailItem) => sortByValue === "all" || emailItem.status === sortByValue
        );
        setEmailsList(filteredArray);
    };


    return (
        <div className='p-4 min-h-[90vh] overflow-auto bg-white dark:bg-[#151515] shadow-md'>
            <Table className="min-w-full divide-y divide-gray-200 dark:bg-[#151510]">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                    Feature is in the pipeline, not built fully yet.
                </TableCaption>
                <TableHeader className="bg-gray-50 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Sr #</TableHead>
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
                <TableBody className="bg-white divide-y divide-gray-200  dark:bg-[#14140f94] dark:divide-gray-700">
                    {currentEmailsList?.length == 0 && <TableRow>
                        <TableCell className="whitespace-nowrap">NULL</TableCell>
                        <TableCell className="whitespace-nowrap">NULL</TableCell>
                        <TableCell className="whitespace-nowrap">Data not available</TableCell>
                        <TableCell className="whitespace-nowrap text-right">NULL</TableCell>
                    </TableRow>}
                    {currentEmailsList?.map((emailItem, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                {(currentPage - 1) * emailsPerPage + idx + 1}
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
            <Pagination
                totalItems={emailsList?.length || 0}
                itemsPerPage={emailsPerPage}
                paginate={paginate}
            />
        </div>
    );
};

export default EmailMarketing;
