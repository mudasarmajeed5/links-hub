import { User } from '@/types/user-account';
import Image from 'next/image';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import backgroundImage from "@/public/theme-backgrounds/free/minimal-background.png";
import UserLinks from '../../user-links';
import ContributeHeader from '../../contribute-header';
import { FaCrown } from "react-icons/fa6";
import SpotifyPlayer from '../../SpotifyPlayer';
import PushEmail from '../../PushEmail';
interface MinimalThemeProps {
  user: User;
}
const MinimalTheme = ({ user }: MinimalThemeProps) => {
  return (
    <>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-pink-400/80 z-2 text-black' />
      <Image
        src={backgroundImage}
        className='absolute object-cover w-full h-full object-center z-0'
        width={1600}
        height={900}
        alt='Background Image'
      />

      <Card className='flex relative mt-20 border-transparent mb-32 w-10/12 md:w-4/5 lg:max-w-[400px] z-1 bg-transparent flex-col items-center justify-center p-6 space-y-4 shadow-none'>
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
        <CardDescription className='text-lg text-black font-semibold'>{user?.name}</CardDescription>
        <div className="text-lg font-semibold text-black">About me</div>
        <CardDescription className='text-black font-poppins font-semibold w-388'>{user.bio}</CardDescription>
        <UserLinks
          data={user}
          linkClass={`text-lg text-black bg-white/70 hover:bg-white w-388`}
          iconClass="text-black text-xl"
          textClass="text-gray-800 font-medium"
        />
        <PushEmail id={user._id.$oid || user._id.toString()} isPremiumUser={user.emailMarketing.enableSignupForm}/>
      </Card>
      <SpotifyPlayer spotifyUrl={user.spotifyUrl} />
    </>
  );
};

export default MinimalTheme;
