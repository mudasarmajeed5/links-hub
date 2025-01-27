"use client";
import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
const Register = () => {
  const { status } = useSession();
  if (status == "authenticated") {
    return <div className='flex min-h-[80vh] justify-center items-center'>Youre signed in Already!</div>
  }
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Sign up</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="text-bold text-sm">Email</div>
          <Input type="email" placeholder='Enter your email'></Input>
          <Input type='password' placeholder='Enter your Password'></Input>
          <div className="text-bold text-sm">Confirm Password</div>
          <Input placeholder='Re-enter Password' type='password'></Input>
          <div className='text-center font-bold text-xl'>OR</div>
          <div className="flex gap-4">
            <Button onClick={() => { signIn("google", { callbackUrl: "/" }) }}><FaGoogle /> Signup with Google</Button>
            <Button onClick={() => { signIn("github", { callbackUrl: "/" }) }}><FaGithub /> Signup with Github</Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>Already Have an account? <Link href="/login">Login</Link> </p>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Register;