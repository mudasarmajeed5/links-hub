"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
type linkData = {
  link_url: string,
  link_title: string,
}
interface AddLinkProps {
  onLinkAdd: (data: linkData) => void;
}

export function AddCustomLink({ onLinkAdd }: AddLinkProps) {
  const [linkData, setLinkData] = useState<linkData>({ link_url: "", link_title: "" })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setLinkData((prev=>({...prev,[name]:value})))
  }
  const handleSubmit = () => {
    onLinkAdd(linkData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-6">Add Custom Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Link Details</DialogTitle>
          <DialogDescription>
            Press save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Link / URL
            </Label>
            <Input name="link_url" value={linkData.link_url} onChange={handleChange} placeholder="https://www.example.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Link Name
            </Label>
            <Input name="link_title" value={linkData.link_title} onChange={handleChange} placeholder="i.e. Behance" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={handleSubmit}>Save changes</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
