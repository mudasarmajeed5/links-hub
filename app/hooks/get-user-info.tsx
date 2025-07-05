"use client";

import { useState, useEffect,useCallback } from "react";
import type { User } from "../types/user-account";
interface FetchUserProps {
  email: string;
}
const useFetchUser = (props: FetchUserProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | null>(null); // Use User type here

  const fetchUser = useCallback(async () => {
    if (!props?.email) return;
    setLoading(true);
    try {
      const response = await fetch("/api/get-user", {
        method: "GET",
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
  },[props.email]);

  useEffect(() => {
    fetchUser();
  }, [])

  return {
    error,
    loading,
    data,
    refetch: fetchUser,
  };
};

export default useFetchUser;
