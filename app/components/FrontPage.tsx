"use client";
import { Button } from '@/components/ui/button';

const Frontpage = () => {
  return (
    <div>
      <div className="flex font-[Poppins] bg-slate-300 text-black pt-20 min-h-screen">
        <div className="flex md:px-6 xl:ml-6 px-3 items-center justify-center gap-4 flex-col">
          <h1 className="text-xl md:text-3xl xl:text-5xl">Everything you are. In one, simple link in bio.</h1>
          <p>Join people using <span className="font-bold">follow tree</span> for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        </div>
        <div className='flex justify-center'>
          <div className="w-9/12">
            <img src="/pngtree.png" alt="" />
          </div>
        </div>
      </div>
      <div className='bg-green-900 text-lime-400 py-5'>
        <div className="flex flex-col md:flex-row py-10">
          <div className="section1 text-xl md:text-3xl xl:text-4xl w-full xl:ml-5 mx-3 leading-tight md:leading-normal xl:leading-relaxed flex flex-col">
            <div>
              Share your <span className="font-bold">FollowTree</span> on any Platform, Find your audience, generate QR code for your follow tree.
            </div>
            <div className="w-1/2"><Button variant="outline" className='w-full font-bold bg-transparent'>Get started for free</Button></div>
          </div>
          <div className="section2 flex w-full justify-center items-center">
            <div>
              <img src="/template3.png" alt="" />
            </div>
          </div>
        </div>

      </div>
      <div className="min-h-screen bg-[#e9c0e9]">
        
      </div>
    </div>
  )
}

export default Frontpage