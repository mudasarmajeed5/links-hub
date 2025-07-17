"use client";

import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { StyleConfig } from "@/themes/themeTypes/themeConfig";
interface PushEmailProps {
    isPremiumUser: boolean;
    userTheme: StyleConfig;
}

const PushEmail = ({ isPremiumUser, userTheme }: PushEmailProps) => {
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const params = useParams();
    const username = params?.username as string;
    const pushEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            const response = await fetch("/api/email-marketing/add-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(response.statusText);
            } else if (data.status === 201) {
                toast.info(data.message);
            } else if (data.status === 202) {
                toast.success(data.message);
            } else if (data.status === 200) {
                toast.error(data.message);
            } else {
                toast.info(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsDisabled(false);
        }
    };

    if (!isPremiumUser) return null;

    return (
        <form
            onSubmit={pushEmail}
            className={cn("space-y-4 relative z-10",userTheme.components.newsletter.container)}
        >
            <h3 className="text-xl font-semibold text-center">Subscribe to my Newsletter</h3>
            <input
                type="email"
                required
                placeholder="Enter your email"
                className={userTheme.components.newsletter.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                type="submit"
                disabled={isDisabled}
                className={cn("w-full disabled:bg-gray-300", userTheme.components.newsletter.button)}
            >
                Subscribe
            </button>
        </form>
    );
};

export default PushEmail;
