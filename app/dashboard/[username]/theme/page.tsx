"use client";
import { useSession } from "next-auth/react";
import { useTitle } from "@/hooks/useTitle";
import ThemesPage from "./components/ThemesPage";
const UserTemplate = () => {
    const { data: session } = useSession();
    useTitle(`${session?.user?.username} - Theme`);
   
    return (
        <ThemesPage/>
    );
};

export default UserTemplate;
