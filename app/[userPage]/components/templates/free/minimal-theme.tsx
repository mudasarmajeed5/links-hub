import { User } from '@/app/types/user-account';
import Image from 'next/image';
import { Card, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import backgroundImage from "@/public/theme-backgrounds/free/minimal-background.png";
import UserLinks from '../../user-links';
import ContributeHeader from '../../contribute-header';
interface MinimalThemeProps {
  user: User;
}
const MinimalTheme = ({ user }: MinimalThemeProps) => {
  return (
    <>
      {/* Background Image */}
      <ContributeHeader navStyle='bg-pink-400/80 text-black' />
      <Image
        src={backgroundImage}
        className='absolute object-cover w-full h-full object-center -z-10'
        width={1600}
        height={900}
        alt='Background Image'
      />

      <Card className='flex bg-white/30 flex-col items-center justify-center p-6 space-y-4 shadow-md'>
        <Avatar className='w-44 border border bg-background/30 h-44'>
          <AvatarImage className='object-contain' src={user?.profilePic} alt="User Profile" />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CardDescription className='text-lg text-black font-bold'>{user?.name}</CardDescription>
        {/* Display bio of user */}
        <CardDescription>{ }</CardDescription>
        <UserLinks
          data={user}
          linkClass="text-xl text-black bg-white/70 hover:bg-white w-[300px]"
          iconClass="text-black text-2xl"
          textClass="text-gray-800 font-medium"
        />


      </Card>
    </>
  );
};

export default MinimalTheme;
