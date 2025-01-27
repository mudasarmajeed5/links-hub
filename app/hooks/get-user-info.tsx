"use client";

import { useState, useEffect } from "react";

interface FetchUserProps {
  email: string;
}

// Define the shape of the formLinks
interface UserLinks {
  instagram: string;
  facebook: string;
  discord: string;
  linkedIn: string;
  medium: string;
  x: string;
  youtube: string;
  snapchat: string;
  pinterest: string;
  github: string;
  tiktok: string;
}

// Define the shape of fetchedUser based on the Mongoose schema
interface User {
  email: string;
  username: string;
  name: string;
  Userlinks: UserLinks; // Updated to match the new structure
  theme: number;
  isPremiumUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const useFetchUser = (props: FetchUserProps | null) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | null>(null); // Use User type here

  useEffect(() => {
    if (!props?.email) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'email': props.email,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.fetchedUser); // Assuming fetchedUser matches the User interface
      } catch (error) {
        const err = error as Error;
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [props?.email]);

  return {
    error,
    loading,
    data,
  };
};

export default useFetchUser;
