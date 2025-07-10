"use client"
import { toast } from "sonner";
import { FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface PushEmailProps {
    id: {
        $oid: string
    },
    isPremiumUser: boolean,
}
const PushEmail = ({ id, isPremiumUser }: PushEmailProps) => {
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const pushEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            const response = await fetch('/api/email-marketing/add-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, id })
                }
            )
            if (!response.ok) {
                toast.error(response.statusText)
            }
            const data = await response.json();
            if (data.status == 201) {
                toast.info(data.message);
            }
            else if (data.status == 200) {
                toast.error(data.message);
            }
            else if(data.status== 202){
                toast.success(data.message);
            }
            else{
                toast.info(data.message);
            }
            setIsDisabled(false);
        } catch (error) {
            console.log(error);
            setIsDisabled(false);
        }
        finally{
            setIsDisabled(false);
        }
    }
    return (
        <>
            {isPremiumUser &&
                <form className='flex items-center rounded-full border w-388 border-white' onSubmit={(e) => pushEmail(e)}>
                    <Input
                        className="focus:outline-none placeholder:text-white border-transparent outline-none"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button disabled={isDisabled} type='submit' className="bg-red-500 rounded-br-full rounded-tr-full text-white px-4 py-2">Subscribe</Button>
                </form>
            }

        </>
    )
}

export default PushEmail