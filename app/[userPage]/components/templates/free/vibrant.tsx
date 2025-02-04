import { User } from '@/app/types/user-account'
import Image from 'next/image';
import React from 'react'
import ContributeHeader from '../../contribute-header';
import backgroundImage from "@/public/theme-backgrounds/free/vibrant-theme.png"
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserLinks from '../../user-links';
interface VibrantThemeProps {
  user: User
}
const VibrantTheme = ({ user }: VibrantThemeProps) => {
  return (
    <>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-green-600/60 z-1 text-white' />
      <Image
        src={backgroundImage}
        className='absolute object-cover w-full h-full object-center z-0'
        width={1600}
        height={900}
        alt='Background Image'
      />

      <Card className='flex z-2 bg-white/30 flex-col items-center justify-center p-6 space-y-4 shadow-md'>
        <Avatar className='w-44 h-44'>
          <AvatarImage className='object-cover object-center' src={user?.profilePic} alt="User Profile" />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CardDescription className='text-lg text-black font-bold'>{user?.name}</CardDescription>
        <div className="text-lg text-black">About me</div>
        <CardDescription className='text-black/80 font-poppins font-semibold'>{ user.bio}</CardDescription>
        <UserLinks
          data={user}
          linkClass="text-lg bg-purple-600/70 hover:bg-purple-600 w-[300px]"
          iconClass="text-white text-xl"
          textClass="text-white font-medium"
        />

      </Card>
    </>
  );
}

export default VibrantTheme