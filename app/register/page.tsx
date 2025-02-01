"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation"; // For navigation after successful signup

const Register = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  if (status == "authenticated") {
    return (
      <div className="flex flex-col min-h-[80vh] justify-center items-center">
        <span>You are signed in already!</span>
        <Link className="bg-black text-white rounded-md px-2 py-1" href="/">
          Home
        </Link>
      </div>
    );
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
          <CardTitle className="text-3xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button
            className="mt-4 w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
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
