"use client";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (session && status == "authenticated") {
    router.push('/dashboard/loading');
  }
  return (
    <div className='flex justify-center items-center  min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="text-bold text-sm">Email</div>
          <Input type="email" placeholder='Enter your email'></Input>
          <div className="text-bold text-sm">Password</div>
          <Input type='password' placeholder='Enter your Password'></Input>
          <div className='text-center font-bold text-xl'>OR</div>
          <div className="flex gap-4">
            <Button onClick={() => { signIn("google", { callbackUrl: `/dashboard/loading` }) }}><FaGoogle /> Login with Google</Button>
            <Button onClick={() => { signIn("github", { callbackUrl: `/dashboard/loading` }) }}><FaGithub /> Login with Github</Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>Dont have an account? <Link href="/register">Signup</Link></p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Login