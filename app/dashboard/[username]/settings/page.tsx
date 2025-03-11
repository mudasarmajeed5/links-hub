"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"
import useFetchUser from "@/app/hooks/get-user-info"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@/app/types/user-account"
import { useTitle } from "@/app/hooks/get-user-title"
type Form = Omit<User, "_id" | "createdAt" | "updatedAt" | "__v" | "isPremiumUser" | "userLinks" | "userTheme" | "viewCount" | "viewHistory">;
export default function UpdateUserSettings() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [updateLoad, setUpdateLoad] = useState(false);
  const [uploadWidgetState, setUploadWidgetState] = useState(false);
  const [error, setError] = useState('');
  const { data, loading } = useFetchUser(email ? { email: email } : { email: '' });
  const [activetab, setActiveTab] = useState("Basic");
  const [tabs, setTabs] = useState(["Basic", "Appearance", "Spotify & CTA"]);
  useTitle(`${session?.user?.username} - Settings`);
  const [form, setForm] = useState<Form>({
    name: '',
    bio: '',
    email: '',
    username: '',
    spotifyUrl: '',
    profilePic: '',
    theme: 'light',
    accentColor: '',
    cta: '',
    emailMarketing: {
      emailList: [],
      enableSignupForm: true,
      welcomeEmail: '',
    },
    seoRanking: {
      name: '',
      description: '',
      keywords: [],
      metaTags: [],
    }
  });

  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results?.info && (results.info as CloudinaryUploadWidgetInfo).secure_url) {
      setForm((prevForm) => ({
        ...prevForm,
        profilePic: (results.info as CloudinaryUploadWidgetInfo).secure_url,
      }));
    }
    setUploadWidgetState(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoad(true);
    const spotifyUrlRegex = /^(https?:\/\/)?(open\.)?(spotify\.com\/)(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)(\?([a-zA-Z0-9_&=-]+))?$/;

    if (form.spotifyUrl && !spotifyUrlRegex.test(form.spotifyUrl)) {
      setError("Invalid Spotify URL.");
      setUpdateLoad(false);
      return;
    }

    try {
      const response = await fetch('/api/update-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': form.email,
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        console.log('failed to update user');
        const data = await response.json();
        setError(data.message);
      } else {
        toast.success("Profile updated");
        setUpdateLoad(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setUpdateLoad(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    if (session.user?.email) {
      setForm((prevForm) => ({ ...prevForm, email: session.user.email ?? "" }));
      setEmail(session.user.email);
    }

    if (data) {
      setForm(data);
    }
    if (data?.isPremiumUser) {
      setTabs(["Basic", "Appearance", "Spotify & CTA", "SEO and Marketing"]);
    } else {
      setTabs(["Basic", "Appearance", "Spotify & CTA"]);
    }
  }, [session, data]);


  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center">
      <Skeleton className="w-[300px] rounded-md h-[420px]" />
    </div>
  }

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      <Card className="w-full lg:max-w-2xl my-10 overflow-auto mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between mb-4">
            <span>Update Settings</span>
            <Link target="_blank" className="font-thin underline underline-offset-2" href={`https://linkshub.space/${session?.user.username}`}>Open your Tree</Link>
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activetab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activetab === "Basic" && (
              <>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      className="text-muted-foreground w-full"
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter new Name"
                    />
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      className="text-muted-foreground w-full"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="Enter new username"
                    />
                  </div>

                  {error && <span className="text-red-600 text-sm w-full">{error}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePic">Profile Picture URL</Label>
                  <Input
                    id="profilePic"
                    className="text-muted-foreground"
                    value={form.profilePic}
                    onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
                    placeholder="Enter profile picture URL"
                  />
                  <CldUploadWidget uploadPreset="links-hub-pfp" onSuccess={handleSuccess} onCloseAction={()=>setUploadWidgetState(false)}>
                    {({ open }) => (
                      <Button
                        type="button"
                        variant={"outline"}
                        className="w-full"
                        disabled={uploadWidgetState}
                        onClick={() => {
                          open();
                          setUploadWidgetState(true);
                        }}
                      >
                        Upload an Image {uploadWidgetState && <Loader2 className="animate-spin" />}
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Add Bio</Label>
                  <Textarea
                    id="bio"
                    className="text-muted-foreground"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Enter your Bio"
                  />
                </div>
                {form.profilePic && (
                  <div className="mt-4 flex justify-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage
                        className="object-cover object-center"
                        src={form.profilePic}
                        alt="Profile preview"
                      />
                      <AvatarFallback>Preview</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </>
            )}
            {activetab === "SEO and Marketing" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="seoName">Add SEO Name</Label>
                  <Input
                    id="seoName"
                    className="text-muted-foreground"
                    value={form.seoRanking.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        seoRanking: { ...form.seoRanking, name: e.target.value },
                      })
                    }
                    placeholder="Enter SEO Name"
                  />
                  <Label htmlFor="seoDescription">Add SEO Description</Label>
                  <Input
                    id="seoDescription"
                    className="text-muted-foreground"
                    value={form.seoRanking.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        seoRanking: { ...form.seoRanking, description: e.target.value },
                      })
                    }
                    placeholder="Enter SEO Description"
                  />
                  <Label htmlFor="seoKeywords">Add comma separated seo keywords</Label>
                  <Input
                    id="seoKeywords"
                    className="text-muted-foreground"
                    value={form.seoRanking.keywords?.join(",") || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        seoRanking: {
                          ...form.seoRanking,
                          keywords: e.target.value.split(","),
                        },
                      })
                    }
                    placeholder="Enter SEO Keywords"
                  />
                  <Label htmlFor="seoMetaTags">Add comma separated seo meta-tags</Label>
                  <Input
                    id="seoMetaTags"
                    className="text-muted-foreground"
                    value={form.seoRanking.metaTags?.join(",") || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        seoRanking: {
                          ...form.seoRanking,
                          metaTags: e.target.value.split(","),
                        },
                      })
                    }
                    placeholder="Enter SEO Meta Tags" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enableSignupForm"
                    checked={form.emailMarketing.enableSignupForm}
                    onCheckedChange={(checked) =>
                      setForm({
                        ...form,
                        emailMarketing: {
                          ...form.emailMarketing,
                          enableSignupForm: !!checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="enableSignupForm">Enable Email Marketing</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeEmail">Welcome Email</Label>
                  <Textarea
                    id="welcomeEmail"
                    className="text-muted-foreground"
                    value={form.emailMarketing.welcomeEmail}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emailMarketing: {
                          ...form.emailMarketing,
                          welcomeEmail: e.target.value,
                        },
                      })
                    }
                    placeholder="Enter welcome email content"
                  />
                </div>
              </>
            )}
            {activetab === "Appearance" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="theme">Add Theme</Label>
                  <select
                    id="theme"
                    value={form.theme}
                    onChange={(e) =>
                      setForm({ ...form, theme: e.target.value as "light" | "dark" })
                    }
                    className="w-full p-1 rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  <Label htmlFor="accentColor">Add Accent color for your Profile</Label>
                  <Input
                    id="accentColor"
                    disabled={!data?.isPremiumUser}
                    className="text-muted-foreground"
                    value={form.accentColor}
                    type="color"
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    placeholder="Enter Accent Color"
                  />
                </div>
              </>
            )}
            {activetab === "Spotify & CTA" && (
              <div className="space-y-2">
                <Label htmlFor="spotifyUrl">Add Spotify URL</Label>
                <Input
                  id="spotifyUrl"
                  className="text-muted-foreground"
                  value={form.spotifyUrl}
                  onChange={(e) => setForm({ ...form, spotifyUrl: e.target.value })}
                  placeholder="Enter Spotify Url"
                />
                <Label htmlFor="ctaLink">Add Call to Action Link</Label>
                <Input
                  id="ctaLink"
                  disabled={!data?.isPremiumUser}
                  className="text-muted-foreground"
                  value={form.cta}
                  onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  placeholder="Enter Call to Action Link"
                />
              </div>
            )}
            <Button type="submit" disabled={updateLoad} className="w-full">
              Update Settings {updateLoad && <Loader2 className="animate-spin" />}
            </Button>
          </form>

        </CardContent>
      </Card>
    </section>
  )
}

