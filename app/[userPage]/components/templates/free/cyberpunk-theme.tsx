import { User } from '@/app/types/user-account'
import React from 'react'
import ContributeHeader from '../../contribute-header';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import UserLinks from '../../user-links';
import backgroundImage from "@/public/theme-backgrounds/free/cyberpunk-theme.jpg"
interface CyberPunkThemeProps {
  user: User
}
const CyberPunkTheme = ({ user }: CyberPunkThemeProps) => {
  return (
    <>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-purple-800 text-white' />
      <Image
        src={backgroundImage}
        className='absolute object-cover w-full h-full object-center -z-10'
        width={1600}
        height={900}
        alt='Background Image'
      />

      <Card className='flex bg-white/30 flex-col items-center justify-center p-6 space-y-4 shadow-md'>
        <Avatar className='w-44 h-44'>
          <AvatarImage src={user?.profilePic} alt="User Profile" />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CardDescription className='text-xl text-white font-bold'>{user?.name}</CardDescription>
        <CardDescription>{ }</CardDescription>
        <UserLinks
          data={user}
          linkClass="text-xl hover:bg-blue-600/90 bg-blue-500 border-2 border-blue-500 w-[300px]"
          iconClass="text-blue-50 text-2xl"
          textClass="text-blue-100 font-medium"
        />


      </Card>
    </>
  );
}

export default CyberPunkTheme