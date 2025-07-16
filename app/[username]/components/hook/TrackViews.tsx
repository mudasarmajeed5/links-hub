"use client";
import { useEffect } from "react";

export default function TrackViews({ username, isPremium }: { username: string; isPremium: boolean }) {
  useEffect(() => {
    if (!isPremium) return;
    fetch('/api/get-user-page', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'username': username,
      },
    }).catch(console.log);
  }, [username, isPremium]);

  return null;
}
