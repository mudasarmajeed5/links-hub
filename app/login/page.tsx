"use client";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormEventHandler, useState } from 'react';
const Login = () => {
  const router = useRouter();
  const [error,setError] = useState<string | null>()
  const [userInfo,setUserInfo] = useState({
    email:'',
    password:''
  })
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push('/dashboard/loading');
    }
  }, [session, status, router]); // Dependencies to watch for session and status changes
  
  const handleSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault(); 
    const res = await signIn('credentials',{
      email:userInfo.email,
      password:userInfo.password,
      redirect:false,
    })
    if(!res?.ok){
      setError(res?.error)
    }
    else{
      router.push('/dashboard/loading')
    }
  }
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target;
    setUserInfo({
      ...userInfo,
      [name]:value
    })
  }
  
  return (
    <div className='flex justify-center items-center  min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form onSubmit={handleSubmit}>
          <div className="text-bold text-sm">Email</div>
          <Input required onChange={handleChange} value={userInfo.email} name='email' type="email" placeholder='Enter your email'></Input>
          <div className="text-bold text-sm">Password</div>
          <Input required onChange={handleChange} value={userInfo.password} name='password' type='password' placeholder='Enter your Password'></Input>
          {error && <span className='text-red-600'>{error}</span>}
          <Button className='w-full mt-6' variant={"outline"}>Log in</Button>
          <div className='text-center font-bold text-xl'>OR</div>
          <div className="flex gap-4">
            <Button onClick={() => { signIn("google", { callbackUrl: `/dashboard/loading` }) }}><FaGoogle /> Login with Google</Button>
            <Button onClick={() => { signIn("github", { callbackUrl: `/dashboard/loading` }) }}><FaGithub /> Login with Github</Button>
          </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>Dont have an account? <Link href="/register">Signup</Link></p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Login