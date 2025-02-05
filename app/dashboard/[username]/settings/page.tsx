"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"
import useFetchUser from "@/app/hooks/get-user-info"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
export default function UpdateUserSettings() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [updateLoad, setUpdateLoad] = useState(false);
  const [uploadWidgetState, setUploadWidgetState] = useState(false);
  const [error, setError] = useState('');
  const [bio, setBio] = useState <string | undefined>('');
  const [email, setEmail] = useState('');
  const { data, loading } = useFetchUser(email ? { email } : { email: '' });
  const [username, setUsername] = useState("");
  const [spotifyUrl,setSpotifyUrl] = useState<string | undefined>('')
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>("")
  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results?.info && (results.info as CloudinaryUploadWidgetInfo).secure_url) {
      setProfilePictureUrl((results.info as CloudinaryUploadWidgetInfo).secure_url)
    }
    setUploadWidgetState(false);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    setUpdateLoad(true);
    e.preventDefault()
    try {
      const response = await fetch('/api/update-settings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'email': email
          },
          body: JSON.stringify({ username, name, profilePictureUrl, bio, spotifyUrl})
        }
      )
      if (!response.ok) {
        console.log('failed to update user');
        const data = await response.json();
        setError(data.message);
      } else {
        toast.success("Profile updated");
        setUpdateLoad(false);
        window.location.reload();
      }
    }
    catch (error) {
      console.error(error)
    }
    setUpdateLoad(false)
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
      setBio(data?.bio)
      setSpotifyUrl(data?.spotifyUrl)
    }
  }, [data, session])
  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center">
      <Skeleton className="w-[300px] rounded-md h-[420px]" />
    </div>
  }

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      <Card className="w-full my-10 lg:max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Update Settings</span>
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
            <div className="space-y-2">
              <Label htmlFor="profilePictureUrl">Add Spotify URL: </Label>
              {data?.isPremiumUser? 
              <Input
              id="music"
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              placeholder="Enter Spotify Url"
            />:
            <>
            <Input
                id="music"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                placeholder="Only for premium users."
                disabled
              />
            </>  
            }
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profilePictureUrl">Add Bio. </Label>
              <Textarea
                id="profilePictureUrl"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter your Bio"
              />
            </div>


            {profilePictureUrl && (
              <div className="mt-4 flex justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage className="object-cover object-center" src={profilePictureUrl} alt="Profile preview" />
                  <AvatarFallback>Preview</AvatarFallback>
                </Avatar>
              </div>
            )}

            <CldUploadWidget
              uploadPreset="links-hub-pfp"
              onSuccess={handleSuccess}
            >
              {({ open }) => (
                <Button type="button" variant={"outline"} className="w-full" onClick={() => {
                  open();
                  setUploadWidgetState(true);
                }
                }>
                  Upload an Image {uploadWidgetState && <Loader2 className="animate-spin" />}
                </Button>
              )}
            </CldUploadWidget>
            <Button type="submit" disabled={updateLoad} className="w-full">
              Update Settings {updateLoad && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

