"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function UpdateUserSettings() {
  const [username, setUsername] = useState("")
  const [profilePictureUrl, setProfilePictureUrl] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitting:", { username, profilePictureUrl, previewImage })
  }

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Update Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
            <Input
              id="profilePictureUrl"
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
              placeholder="Enter profile picture URL"
            />
          </div>
          {(previewImage || profilePictureUrl) && (
            <div className="mt-4 flex justify-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewImage || profilePictureUrl} alt="Profile preview" />
                <AvatarFallback>Preview</AvatarFallback>
              </Avatar>
            </div>
          )}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Drop a PNG file here or click to upload</p>
            <input type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={handleFileInput} id="fileInput" />
            <Label htmlFor="fileInput" className="cursor-pointer text-blue-500 hover:text-blue-600">
              Select file
            </Label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Update Settings
        </Button>
      </CardFooter>
    </Card>
    </section>
  )
}

