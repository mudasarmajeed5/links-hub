import { User } from '@/app/types/user-account'
import React from 'react'
import ContributeHeader from '../../contribute-header';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserLinks from '../../user-links';
import SpotifyPlayer from '../../SpotifyPlayer';
import { FaCrown } from 'react-icons/fa';
interface VibrantThemeProps {
  user: User
}
const VibrantTheme = ({ user }: VibrantThemeProps) => {
  return (
    <div className='bg-purple-400 w-full h-full flex items-center justify-center'>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-green-600/60 z-2 text-white' />
      <Card className='flex z-1 relative mt-20 mb-32 w-10/12 md:w-4/5 lg:max-w-[400px] bg-transparent flex-col items-center justify-center p-6 space-y-4 border-none shadow-none'>
        <div className='border-2 border-yellow-300 rounded-full relative'> 
          <Avatar className='w-44 bg-background/30 h-44'>
            <AvatarImage className='object-contain object-center' src={user?.profilePic} alt="User Profile" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center px-2 py-1">
            <span className="">
              <FaCrown className="fill-yellow-400 text-3xl" />
            </span>
          </div>
        </div>
        <CardDescription className='text-lg text-black font-bold'>{user?.name}</CardDescription>
        <div className="text-lg text-black">About me</div>
        <CardDescription className='text-black/80 font-poppins font-semibold w-388'>{user.bio}</CardDescription>
        <UserLinks
          data={user}
          linkClass="text-lg bg-purple-600/70 hover:bg-purple-600 w-388"
          iconClass="text-white text-xl"
          textClass="text-white font-medium"
        />

      </Card>
      <SpotifyPlayer spotifyUrl={user.spotifyUrl} />
    </div>
  );
}

export default VibrantTheme