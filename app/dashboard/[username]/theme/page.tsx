"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTitle } from "@/hooks/useTitle";
import Image from "next/image";
const UserTemplate = () => {
    const { data: session } = useSession();
    useTitle(`${session?.user?.username} - Theme`);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>('/template-placeholders/free/template-1.jpeg');
    const [themeNo, setThemeNo] = useState(1);
    const updatedThemeToDatabase = async (email: string) => {
        try {
            await fetch('/api/update-to-database',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'email': email,
                    },
                    body: JSON.stringify(themeNo),
                }
            )
            toast.success('Theme updated');
        } catch (error) {
            console.log(error)
        }
    }
    const handleSelectTemplate = (template: string) => {
        setSelectedTemplate(template);
    };
    return (
        <div className="m-5">
            <h2 className="text-center text-2xl underline underline-offset-4">Select a Template</h2>
            <div className="text-center flex justify-center text-xs gap-2 my-2">
                <span>Website Live at: </span>
                <Link target="_blank" className="text-blue-700 dark:text-blue-600" href={`https://linkshub.space/${session?.user.username}`}>
                     {`https://linkshub.space/${session?.user.username}`}
                </Link>
            </div>
            <div className="flex lg:justify-around flex-col lg:flex-row items-center">
                <div className="flex my-5 gap-6 flex-wrap items-center justify-center">
                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template-placeholders/free/template-1.jpeg' ? 'border-4 border-red-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template-placeholders/free/template-1.jpeg'); setThemeNo(1) }}
                    >
                        <Image
                            src="/template-placeholders/free/template-1.jpeg"
                            alt="Template 1"
                            width={128}
                            height={256}
                            className="w-32 h-64"
                        />
                    </div>

                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template-placeholders/free/template-2.jpeg' ? 'border-4 border-red-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template-placeholders/free/template-2.jpeg'); setThemeNo(2) }}
                    >
                        <Image
                            src="/template-placeholders/free/template-2.jpeg"
                            alt="Template 2"
                            width={128}
                            height={256}
                            className="w-32 h-64"
                        />
                    </div>

                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template-placeholders/free/template-3.jpeg' ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template-placeholders/free/template-3.jpeg'); setThemeNo(3) }}
                    >
                        <Image
                            src="/template-placeholders/free/template-3.jpeg"
                            alt="Template 3"
                            width={128}
                            height={256}
                            className="w-32 h-64"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    {selectedTemplate ? (
                        <p className="flex flex-col gap-1">

                            <Image
                                src={selectedTemplate}
                                alt="Selected Template"
                                width={200}
                                height={400}
                                className="w-[200px] h-[400px] object-cover object-center mt-2"
                            />
                            <Button onClick={() => updatedThemeToDatabase(session?.user?.email ?? '')}>
                                Save
                            </Button>

                        </p>
                    ) : (
                        <p>Please select a template</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserTemplate;
