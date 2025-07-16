"use client"
import { useEffect } from "react";
export function useTitle(title?: string) {
  useEffect(() => {
      if (!title) return; 

      const prevTitle = document.title;
      document.title = title;

      return () => {
          document.title = prevTitle;
      };
  }, [title]); 
}
