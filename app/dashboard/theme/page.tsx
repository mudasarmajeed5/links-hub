"use client";
import { useSession } from "next-auth/react";
import { useTitle } from "@/hooks/useTitle";
import ThemesPage from "./components/ThemesPage";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
const UserTemplate = () => {
    const { data: session } = useSession();
    useTitle(`${session?.user?.username} - Theme`);

    return (
        <>
            <div className="px-6 pt-3 text-sm dark:text-gray-300 flex items-start gap-2">
                <FaInfoCircle className="text-blue-400 mt-1" />
                <p>
                    Light/dark modes and premium theme animations are visible on&nbsp;
                    <Link
                        href={`/${session?.user.username}`}
                        className="text-blue-400 underline hover:text-blue-300"
                    >
                        your page
                    </Link>.
                </p>
            </div>

            <ThemesPage />
        </>
    );
};

export default UserTemplate;
