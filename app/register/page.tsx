"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [timer,setTimer] = useState(0);
  const [signUpAllowed, setSignupAllowed] = useState(false);
  const [email, setEmail] = useState("");
  const [isdisabled, setIsDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setverifyingOtp] = useState(false);
  const [otp, setOtp] = useState<string>("");
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  const sendOtp = async () => {
    setIsDisabled(true);
    if (!email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      setIsDisabled(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsDisabled(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setIsDisabled(false);
      return;
    }
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (data.status == 201) {
      toast.success('OTP sent successfully');
      setTimer(60);
    }
    else{
      setIsDisabled(false);
    }
    setError(null);
  }
  const verifyOtp = async () => {
    setverifyingOtp(true);
    if (!email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }
    const response = await fetch('/api/auth/send-otp', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });
    const data = await response.json();
    if(data.error){
      toast.error(data.error)
      setverifyingOtp(false);
    }
    if (data.status == 201) {
      toast.success('OTP verified successfully, Signup to continue');
      setSignupAllowed(true);
      setverifyingOtp(false);
    }
    setError(null);
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        router.push("/login");
      } else {
        setLoading(false);
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      setError(`${err}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-bold text-sm">Email</div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <div className="text-bold text-sm">Password</div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <div className="text-bold text-sm">Confirm Password</div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
          />
          <div className="text-bold text-sm">OTP</div>
          <div className="flex items-center gap-1">
            <Input
              type="text"
              value={otp}
              className="text-xs"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP" />
            <div className="text-right my-2"><Button variant={"outline"} size={"sm"} onClick={sendOtp} disabled={isdisabled}>
              {
                isdisabled ?
                `Resend OTP in ${timer}` : 'Request OTP'
              }
            </Button></div>
          </div>
          <Button disabled={verifyingOtp} variant={"outline"} onClick={verifyOtp} className="w-full">
            {verifyingOtp ? "Validating..." : "Valide OTP"}
          </Button>
          {
            signUpAllowed && (
              <Button
                className="mt-4 w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            )
          }
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-center font-bold text-xl">OR</div>
          <div className="flex gap-4">
            <Button onClick={() => { signIn("google", { callbackUrl: "/" }) }}><FaGoogle /> Signup with Google</Button>
            <Button onClick={() => { signIn("github", { callbackUrl: "/" }) }}><FaGithub /> Signup with Github</Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Already have an account? <Link href="/login">Login</Link>
          </p>

        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
