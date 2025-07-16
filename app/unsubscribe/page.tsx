"use client";
import { useEffect,FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import useFetchUser from '../hooks/useFetchUser';
import { Input } from '@/components/ui/input';
const UnsubscribeUser = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [subscriberMail, setSubscriberMail] = useState('');
  const { data } = useFetchUser(email ? { email } : { email: '' });
  const name = data?.name;
  const [loader, setLoader] = useState<boolean>(false);
  const removeSubscription = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoader(true);
      const response = await fetch('/api/user/unsubscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, subscriberMail })
        }
      )
      const data = await response.json();
      if (!response.ok) {
        toast.error('An unknown error occured');
      }
      const statusCode = data.status;
      if (statusCode == 404) {
        toast.error(data.message)
      }
      if (statusCode == 200) {
        toast.success(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
  }


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsEmail = params.get("email");
    if (paramsEmail) {
      setEmail(paramsEmail);
    }
  }, []);
  
  if (!email) return null;
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">Manage Subscription</h2>
        <p className="text-gray-600 font-bold my-2 text-center">Unsubscribe from {name}&#8217;s NewsLetter</p>
        <form onSubmit={removeSubscription} className='flex gap-1 mt-5 mb-3 w-full items-center'>
          <Input
            value={subscriberMail}
            type='email'
            required
            placeholder='Enter your Email'
            onChange={(e) => setSubscriberMail(e.target.value)}
          />
          <Button
            type='submit'
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <span>Unsubscribe</span>
            {loader && <Loader2 className='animate-spin' />}
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-3">You can resubscribe anytime.</p>
      </div>
    </div>
  </Suspense>

  )
}

export default UnsubscribeUser