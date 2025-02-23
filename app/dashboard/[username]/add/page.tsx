"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Icons from "react-icons/fa"; // Import all Fa icons
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import useFetchUser from "@/app/hooks/get-user-info"
import { useRouter } from "next/navigation";
import { useTitle } from "@/app/hooks/get-user-title";
interface userLinks {
  icon: string;
  label: string;
  link: string;
  _id: {
    $oid: string;
  };
}
type filteredDataType = {
  icon: string;
  label: string;
  link: string;
}[]
interface Inputs {
  instagram?: string;
  facebook?: string;
  discord?: string;
  linkedIn?: string;
  medium?: string;
  x?: string;
  youtube?: string;
  snapchat?: string;
  pinterest?: string;
  github?: string;
  tiktok?: string;
  stackoverflow?: string;
}

const AddLink = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loader, setLoader] = useState(false);
  useTitle(`${session?.user.username} - Add Links`);
  const [userData, setUserData] = useState<userLinks[] | undefined>();
  const [email, setEmail] = useState<string>("");
  const { error, data, loading } = useFetchUser(email ? { email } : { email: '' });
  const platformBaseUrls = {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    discord: "https://discord.com/users/",
    linkedIn: "https://linkedin.com/in/",
    medium: "https://medium.com/@",
    x: "https://x.com/",
    youtube: "https://youtube.com/@",
    snapchat: "https://snapchat.com/add/",
    pinterest: "https://pinterest.com/",
    github: "https://github.com/",
    tiktok: "https://tiktok.com/@",
    stackoverflow: "https://stackoverflow.com/users/",
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
    if (data) {
      setUserData(data.userLinks)
    }
  }, [session, data])
  useEffect(() => {
    if (userData) {
      userLinks.forEach(({ name, label }) => {
        const linkEntry = userData.find((user: userLinks) => user.label.toLowerCase() === label.toLowerCase());
        if (linkEntry) {
          const baseUrl = platformBaseUrls[name as keyof Inputs];
          const username = linkEntry.link.replace(baseUrl, "");
          setValue(name as keyof Inputs, username);
        } else {
          console.log(`No data found for ${label}`);
        }
      });
    }
  }, [userData, setValue]);

  const userLinks = [
    { name: "instagram", label: "Instagram", icon: "FaInstagram" },
    { name: "facebook", label: "Facebook", icon: "FaFacebook" },
    { name: "x", label: "X (Twitter)", icon: "FaTwitter" },
    { name: "github", label: "Github", icon: "FaGithub" },
    { name: "linkedIn", label: "LinkedIn", icon: "FaLinkedin" },
    { name: "snapchat", label: "Snapchat", icon: "FaSnapchat" },
    { name: "pinterest", label: "Pinterest", icon: "FaPinterest" },
    { name: "youtube", label: "YouTube", icon: "FaYoutube" },
    { name: "medium", label: "Medium", icon: "FaMedium" },
    { name: "discord", label: "Discord", icon: "FaDiscord" },
    { name: "tiktok", label: "TikTok", icon: "FaTiktok" },
    { name: 'stackoverflow', label: 'Stack Overflow', icon: "FaStackOverflow" },
  ];

  const updateToDatabase = async (email: string, filteredData: filteredDataType) => {
    setLoader(true);
    try {
      await fetch('/api/update-to-database',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'email': email,
          },
          body: JSON.stringify({ filteredData })
        }
      )
      toast.success("Links saved successfully!");
    } catch (error) {
      toast.error('Unknown Error occured');
      console.error('Failed to updated', error)
    } finally {
      setLoader(false);
    }
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const filteredData = userLinks.map(({ name, label, icon }) => {
      const username = data[name as keyof Inputs] || ""; // Get the username only
      const baseUrl = {
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
        discord: "https://discord.com/users/",
        linkedIn: "https://linkedin.com/in/",
        medium: "https://medium.com/@",
        x: "https://x.com/",
        youtube: "https://youtube.com/@",
        snapchat: "https://snapchat.com/add/",
        pinterest: "https://pinterest.com/",
        github: "https://github.com/",
        tiktok: "https://tiktok.com/@",
        stackoverflow: "https://stackoverflow.com/users/",
      }[name as keyof Inputs] || "";

      return { icon, label, link: username ? baseUrl + username : "" };
    });

    if (!session || !session.user || !session.user.email) {
      toast.error("Make sure You're signed In");
      return;
    }

    console.log(filteredData);
    updateToDatabase(session?.user.email, filteredData);
  };
  if (error) {
    return <div className="min-h-[80vh] flex justify-center items-center">{error}</div>
  }
  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin" /></div>
  }
  return (
    <div className="p-4 flex flex-col gap-6 items-center justify-center rounded-lg max-w-3xl mx-auto">
      <h1 className="text-center my-3 text-2xl font-medium underline underline-offset-2">Add Links</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {userLinks.map(({ name, label, icon }) => {
            const IconComponent = Icons[icon as keyof typeof Icons];
            return (
              <div key={name} className="flex flex-col relative gap-1">
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                  <Label htmlFor={name}>{label}</Label>
                </div>
                <Input
                  id={name}
                  {...register(name as keyof Inputs)}
                  placeholder={`Enter ${label} username`}
                  className={`mt-2 text-muted-foreground pr-10 border rounded-md p-2 ${watch(name as keyof Inputs) ? "border-green-500" : "border-gray-300"
                    }`}
                />

                {watch(name as keyof Inputs) && (
                  <Check className="absolute -right-2 p-1 top-1/2 bg-green-600 rounded-full transform -translate-y-1/2 text-black" size={25} />
                )}

                {errors[name as keyof Inputs] && (
                  <span className="text-red-500 text-sm">{errors[name as keyof Inputs]?.message}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 items-center w-full">
          <Button type="submit" variant={"secondary"} className="mt-6 w-full">
            {loader ? (
              <span className="flex items-center gap-1">
                <b>Saving.. </b>
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              <span>Save</span>
            )}
          </Button>

          <div className="flex justify-center items-center w-auto mt-6">

          </div>

          <Button
            onClick={() => router.push(`/dashboard/${data?.username}/theme`)}
            className="mt-6 border flex justify-center items-center border-green-900 w-full"
          >
            <span>Next</span>
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddLink;
