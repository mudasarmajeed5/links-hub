"use client";

import { useState, useEffect } from "react";
import type { User } from "../types/user-account";
interface FetchUserProps {
  email: string;
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
        setData(result.fetchedUser); 
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
