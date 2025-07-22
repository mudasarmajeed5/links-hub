"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary"
import { useSession } from "next-auth/react"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { User } from "@/types/user-account"
import { useTitle } from "@/hooks/useTitle"
import { useUserStore } from "@/store/useUserStore"
import CTAForm from "./components/CTAForm"
import { BasicSettings } from "./components/BasicSettings"
import { Appearance } from "./components/Appearance"
import { SEOAndMarketing } from "./components/SEOAndMarketing"
type Form = Omit<User, "_id" | "createdAt" | "updatedAt" | "__v" | "userLinks" | "userTheme" | "viewCount" | "viewHistory">;
export default function UpdateUserSettings() {
  const { user, loading, fetchUser } = useUserStore();
  const { data: session } = useSession();
  const [updateLoad, setUpdateLoad] = useState(false);
  const [uploadWidgetState, setUploadWidgetState] = useState(false);
  const [error, setError] = useState('');
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
    cta: {
      text: "",
      icon: "",
      url: "",
    },
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
      }
    } catch (error) {
      console.error(error);
      setUpdateLoad(false);
    }
  };
  // Set email
  useEffect(() => {
    if (session?.user?.email) {
      setForm((prevForm) => ({ ...prevForm, email: user?.email ?? "" }));
    }
  }, [session?.user?.email]);


  useEffect(() => {
    if (!user && !loading) {
      fetchUser();
    }
    if (user) {
      setForm(user);
      setTabs(session?.user.isPremiumUser
        ? ["Basic", "Appearance", "Spotify & CTA", "SEO and Marketing"]
        : ["Basic", "Appearance", "Spotify & CTA"]);
    }
  }, [user]);

  if (!user || loading) return null;
  return (
    <section>
      <Card className="w-full rounded-none h-[calc(100vh-80px)] overflow-auto mx-auto dark:bg-[#151515]">
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
              <BasicSettings
                form={form}
                setForm={setForm}
                handleSuccess={handleSuccess}
                uploadWidgetState={uploadWidgetState}
                setUploadWidgetState={setUploadWidgetState}
                error={error}
              />
            )}
            {activetab === "SEO and Marketing" && (
              <>
                <SEOAndMarketing form={form} setForm={setForm} />
              </>
            )}
            {activetab === "Appearance" && (
              <Appearance form={form} setForm={setForm} />
            )}

            {activetab === "Spotify & CTA" && (
              <CTAForm form={form} setForm={setForm} user={user} />
            )}
            <Button type="submit" disabled={updateLoad} className="max-w-fit mx-4">
              Update Settings {updateLoad && <Loader2 className="animate-spin" />}
            </Button>
          </form>

        </CardContent>
      </Card>
    </section>
  )
}

