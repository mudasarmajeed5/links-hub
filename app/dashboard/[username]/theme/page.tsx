"use client";
import React, { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
const UserTemplate = () => {
    const { data: session } = useSession();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>('/template1.png');
    const [themeNo, setThemeNo] = useState(1);
    const updatedThemeToDatabase = async(email:string) => {
        try {
            await fetch('/api/update-to-database',
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'email':email,
                    },
                    body:JSON.stringify(themeNo),
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
    useEffect(() => {
      if(!session) return;
      if(session?.user && session.user.email){
          updatedThemeToDatabase(session.user.email)
      }
    }, [session,selectedTemplate])
    return (
        <div className="m-5">
            <h2 className="text-center text-2xl underline underline-offset-4">Select a Template</h2>
            <div className="flex lg:justify-around flex-col lg:flex-row items-center">
                <div className="flex my-5 gap-6 flex-wrap items-center justify-center">
                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template1.png' ? 'border-4 border-red-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template1.png'); setThemeNo(1) }}
                    >
                        <img src="/template1.png" alt="Template 1" className="w-32 h-64" />
                    </div>

                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template2.png' ? 'border-4 border-red-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template2.png'); setThemeNo(2) }}
                    >
                        <img src="/template2.png" alt="Template 2" className="w-32 h-64" />
                    </div>

                    <div
                        className={`cursor-pointer ${selectedTemplate === '/template3.png' ? 'border-4 border-blue-500' : ''}`}
                        onClick={() => { handleSelectTemplate('/template3.png'); setThemeNo(3) }}
                    >
                        <img src="/template3.png" alt="Template 3" className="w-32 h-64" />
                    </div>
                </div>

                <div className="mt-4">
                    {selectedTemplate ? (
                        <p>
                            You selected:{" "}
                            <img
                                src={selectedTemplate}
                                alt="Selected Template"
                                className="w-[200px] h-[400px] object-cover object-center mt-2"
                            />
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
