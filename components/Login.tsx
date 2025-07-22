"use client";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })
    if (!res?.ok) {
      toast.error(res?.error);

    }
    else {
      router.push('/dashboard')
    }
    setLoading(false);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user?.username) {
      router.replace(`/dashboard`);
    }
  }, [status, session, router]);
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
            <Button className='w-full mt-6 flex items-center' variant={"outline"}>
              {
                loading ?
                  <span className='flex items-center gap-2'>Logging in <Loader2 className='animate-spin' /> </span> : 'Login'
              }
            </Button>
            <div className='text-center font-bold text-xl'>OR</div>
            <div className="flex gap-4">
              <Button onClick={() => { signIn("google", { callbackUrl: `/dashboard` }) }}><FaGoogle /> Login with Google</Button>
              <Button onClick={() => { signIn("github", { callbackUrl: `/dashboard` }) }}><FaGithub /> Login with Github</Button>
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