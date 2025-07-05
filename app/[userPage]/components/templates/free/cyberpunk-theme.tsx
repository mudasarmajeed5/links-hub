import { User } from '@/app/types/user-account'
import React from 'react'
import ContributeHeader from '../../contribute-header';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import UserLinks from '../../user-links';
import backgroundImage from "@/public/theme-backgrounds/free/cyberpunk-theme.jpg";
import SpotifyPlayer from '../../SpotifyPlayer';
import { FaCrown } from 'react-icons/fa';
import PushEmail from '../../PushEmail';
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

      <Card className='flex w-10/12 relative border-none md:w-4/5 lg:max-w-[400px] z-1 bg-transparent mt-20 mb-32 flex-col items-center justify-center p-6 space-y-4 shadow-none'>
        <div className='border-2 border-yellow-300 rounded-full relative'>
          <Avatar className='w-44 bg-background/30 h-44'>
            <AvatarImage className='object-contain object-center' src={user?.profilePic} alt="User Profile" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center px-2 py-1">
            {
              user.isPremiumUser &&
              (
                <span>
                  <FaCrown className="fill-yellow-400 text-3xl" />
                </span>
              )
            }
          </div>
        </div>
        <div className='bg-white p-5 rounded-2xl'>
          <CardDescription className='text-xl font-poppins text-black font-bold'>{user?.name}</CardDescription>
          <div className="text-lg text-black">About me</div>
          <CardDescription className='text-black/80 font-poppins font-semibold w-388'>{user.bio}</CardDescription>
        </div>
        <div className='bg-white p-5 rounded-2xl'>
          <UserLinks
            data={user}
            linkClass="text-lg hover:bg-blue-600/90 my-2 bg-blue-500 border-2 border-blue-500 w-388"
            iconClass="text-blue-50 text-xl"
            textClass="text-blue-100 font-medium"
          />
        <PushEmail id={user._id} isPremiumUser={user.emailMarketing.enableSignupForm}/>
        </div>
      </Card>
      <SpotifyPlayer spotifyUrl={user.spotifyUrl} />
    </>
  );
}

export default CyberPunkTheme