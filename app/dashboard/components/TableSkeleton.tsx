import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const TableSkeleton = () => {
  return (
    <Table className="min-h-screen divide-y divide-gray-200 dark:divide-gray-700">
            <TableCaption className="text-gray-500 dark:text-gray-400">Feature is in the pipeline, not built fully yet.</TableCaption>
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
                <TableRow>
                <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Email</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Subscription Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {Array.from({length:10}).map((_,index)=>(
                <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <TableCell className="px-6 h-6 whitespace-nowrap text-sm font-medium bg-gray-900 dark:bg-gray-700">
                        <Skeleton className="w-full h-6"/>
                    </TableCell>
                    <TableCell className="px-6 h-6 whitespace-nowrap text-sm bg-gray-500 dark:bg-gray-700">
                        <Skeleton className="w-full h-6"/>
                    </TableCell>
                    <TableCell className="px-6 h-6 whitespace-nowrap text-sm bg-gray-500 dark:bg-gray-700">
                        <Skeleton className="w-full h-6"/>
                    </TableCell>
                    <TableCell className="px-6 h-6 whitespace-nowrap text-sm text-right bg-gray-500 dark:bg-gray-700">
                        <Skeleton className="w-full h-6"/>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
  )
}

export default TableSkeleton