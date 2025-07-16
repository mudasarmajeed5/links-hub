import React from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const LoadingSkeleton = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className='flex z-1 relative mt-20 mb-32 w-10/12 md:w-4/5 lg:max-w-[400px] bg-gray-200 flex-col items-center justify-center p-6 space-y-4 shadow-md animate-pulse'>
        <Avatar className='w-44 h-44 bg-gray-300'>
          <AvatarFallback className='bg-gray-400' />
        </Avatar>
        <CardDescription className='h-6 w-32 bg-gray-300 rounded'></CardDescription>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <CardDescription className='h-4 w-3/4 bg-gray-300 rounded'></CardDescription>
        <div className='h-10 w-[300px] bg-gray-300 rounded'></div>
      </Card>
    </div>
  );
};

export default LoadingSkeleton;