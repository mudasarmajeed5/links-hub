"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"
import useFetchUser from "@/app/hooks/get-user-info"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { RefreshCcw } from "lucide-react";
export default function UpdateUserSettings() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [error,setError] = useState('');
  const [email, setEmail] = useState('');
  const { data, loading } = useFetchUser(email ? { email } : { email: '' });
  const [username, setUsername] = useState("")
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>("")
  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results?.info && (results.info as CloudinaryUploadWidgetInfo).secure_url) {
      setProfilePictureUrl((results.info as CloudinaryUploadWidgetInfo).secure_url)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/update-settings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'email': email
          },
          body: JSON.stringify({ username, name, profilePictureUrl })
        }
      )
      if (!response.ok) {
        console.log('failed to update user');
        const data = await response.json();
        setError(data.message);
      } else {
        toast.success("Profile updated");
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!session) return;
    if (session.user && session.user.email) {
      setEmail(session.user?.email)
    }
    if (data) {
      setName(data.name)
      setUsername(data.username)
      setProfilePictureUrl(data.profilePic)
    }
  }, [data, session])
  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center">
      <Skeleton className="w-[300px] rounded-md h-[420px]" />
    </div>
  }

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Update Settings</span>
            <Button size={"icon"} variant={"outline"}><RefreshCcw /></Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new Name"
              />
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter new username"
              />
              {error && <span className="text-red-600 text-sm">{error}</span>}
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

            {profilePictureUrl && (
              <div className="mt-4 flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profilePictureUrl} alt="Profile preview" />
                  <AvatarFallback>Preview</AvatarFallback>
                </Avatar>
              </div>
            )}

            <CldUploadWidget
              uploadPreset="links-hub-pfp"
              onSuccess={handleSuccess}
            >
              {({ open }) => (
                <Button variant={"outline"} className="w-full" onClick={() => open()}>
                  Upload an Image
                </Button>
              )}
            </CldUploadWidget>
            <Button type="submit" className="w-full">
              Update Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

