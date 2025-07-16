import { LogIn } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
interface ContributeHeaderProps{
  navStyle?:string;
}
const ContributeHeader = ({ navStyle }: ContributeHeaderProps) => {
  return (
    <nav className={`absolute p-2 top-0 flex ${navStyle} justify-between left-0 w-full`}>
        <Link href={"/  "} className='underline underline-offset-2 flex items-center gap-1 hover:underline-offset-4'>
          <LogIn/>
          <span>Create your Tree</span>
        </Link>
        <Link href={"https://github.com/mudasarmajeed5/follow-tree"} target='_blank' className='underline flex items-center gap-1 underline-offset-2 hover:underline-offset-4'>
          <FaGithub/>
          <span>Contribute</span>
        </Link>
      </nav>
  )
}

export default ContributeHeader