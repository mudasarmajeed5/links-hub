import { User } from '@/app/types/user-account'
import React from 'react'
import ContributeHeader from '../../contribute-header';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import UserLinks from '../../user-links';
import backgroundImage from "@/public/theme-backgrounds/free/cyberpunk-theme.jpg"
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import SpotifyPlayer from '../../SpotifyPlayer';
interface CyberPunkThemeProps {
  user: User
}
const CyberPunkTheme = ({ user }: CyberPunkThemeProps) => {
  return (
    <>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-purple-800 z-2 text-white' />
      <Image
        src={backgroundImage}
        className='absolute object-cover w-full h-full object-center z-0'
        width={1600}
        height={900}
        alt='Background Image'
      />

      <Card className='flex w-10/12 relative md:w-4/5 lg:max-w-[400px] z-1 mt-20 mb-32 bg-white/30 flex-col items-center justify-center p-6 space-y-4 shadow-md'>
        {user.isPremiumUser && <span className="absolute text-sm flex items-center gap-2 top-0 left-0 bg-yellow-600 text-white rounded-full px-3 py-1 border-2 border-yellow-300 shadow-md">
          <MdOutlineWorkspacePremium className="rotate-45 text-xl" /> Premium User
        </span>}
        <Avatar className='w-44 h-44'>
          <AvatarImage className='object-cover object-center' src={user?.profilePic} alt="User Profile" />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CardDescription className='text-xl text-black font-bold'>{user?.name}</CardDescription>
        <div className="text-lg text-black">About me</div>
        <CardDescription className='text-black/80 font-poppins font-semibold'>{user.bio}</CardDescription>
        <UserLinks
          data={user}
          linkClass="text-lg hover:bg-blue-600/90 bg-blue-500 border-2 border-blue-500 w-[300px]"
          iconClass="text-blue-50 text-xl"
          textClass="text-blue-100 font-medium"
        />


      </Card>
      <SpotifyPlayer spotifyUrl={user.spotifyUrl} />
    </>
  );
}

export default CyberPunkTheme