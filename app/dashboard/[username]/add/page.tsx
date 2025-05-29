"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Icons from "react-icons/fa";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import useFetchUser from "@/app/hooks/get-user-info";
import { useRouter } from "next/navigation";
import { useTitle } from "@/app/hooks/get-user-title";
import { AddCustomLink } from "./components/AddCustomLink";

interface UserLinks {
  icon: string;
  label: string;
  link: string;
  _id: {
    $oid: string;
  };
}
type UserLinkPayload = Omit<UserLinks, "_id">;
interface SocialPlatform {
  name: string;
  label: string;
  icon: string;
  baseUrl: string;
}

interface CustomLink {
  name: string;
  label: string;
  icon: string;
  isCustom: true;
}

type PlatformConfig = SocialPlatform | CustomLink;

interface Inputs {
  [key: string]: string;
}

const AddLink = () => {
  const router = useRouter();
  // Static social platforms configuration
  const socialPlatforms: SocialPlatform[] = [
    { name: "instagram", label: "Instagram", icon: "FaInstagram", baseUrl: "https://instagram.com/" },
    { name: "facebook", label: "Facebook", icon: "FaFacebook", baseUrl: "https://facebook.com/" },
    { name: "x", label: "X (Twitter)", icon: "FaTwitter", baseUrl: "https://x.com/" },
    { name: "github", label: "Github", icon: "FaGithub", baseUrl: "https://github.com/" },
    { name: "linkedIn", label: "LinkedIn", icon: "FaLinkedin", baseUrl: "https://linkedin.com/in/" },
    { name: "snapchat", label: "Snapchat", icon: "FaSnapchat", baseUrl: "https://snapchat.com/add/" },
    { name: "pinterest", label: "Pinterest", icon: "FaPinterest", baseUrl: "https://pinterest.com/" },
    { name: "youtube", label: "YouTube", icon: "FaYoutube", baseUrl: "https://youtube.com/@" },
    { name: "medium", label: "Medium", icon: "FaMedium", baseUrl: "https://medium.com/@" },
    { name: "discord", label: "Discord", icon: "FaDiscord", baseUrl: "https://discord.com/users/" },
    { name: "tiktok", label: "TikTok", icon: "FaTiktok", baseUrl: "https://tiktok.com/@" },
    { name: "stackoverflow", label: "Stack Overflow", icon: "FaStackOverflow", baseUrl: "https://stackoverflow.com/users/" },
  ];

  const { data: session } = useSession();
  const [loader, setLoader] = useState(false);
  const [allPlatforms, setAllPlatforms] = useState<PlatformConfig[]>(socialPlatforms);
  const [userData, setUserData] = useState<UserLinks[] | undefined>();
  const [email, setEmail] = useState<string>("");

  useTitle(`${session?.user.username} - Add Links`);

  const { error, data, loading } = useFetchUser(email ? { email } : { email: '' });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });

  // Helper function to extract username from full URL
  const extractUsername = (fullUrl: string, baseUrl: string): string => {
    if (!fullUrl) return "";
    return fullUrl.replace(baseUrl, "");
  };

  // Helper function to find platform by label (case-insensitive)
  const findPlatformByLabel = (label: string): PlatformConfig | undefined => {
    return allPlatforms.find(platform =>
      platform.label.toLowerCase() === label.toLowerCase()
    );
  };

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
    if (data) {
      setUserData(data.userLinks);
    }
  }, [session, data]);

  // Populate form with existing user data
  useEffect(() => {
    if (userData && userData.length > 0) {
      userData.forEach((userLink: UserLinks) => {
        const platform = findPlatformByLabel(userLink.label);

        if (platform) {
          if ('baseUrl' in platform) {
            // Social platform - extract username
            const username = extractUsername(userLink.link, platform.baseUrl);
            setValue(platform.name, username);
          } else {
            // Custom link - store full URL
            setValue(platform.name, userLink.link);
          }
        }
      });
    }
  }, [userData, setValue, allPlatforms]);

  // Add custom link functionality
  const createCustomLink = (linkData: { link_url: string, link_title: string }) => {
    const isPremiumUser = data?.isPremiumUser || false;
    const currentCustomLinks = allPlatforms.filter(platform => 'isCustom' in platform);

    // Check premium restrictions
    if (!isPremiumUser && currentCustomLinks.length >= 2) {
      toast.error("Free users can only add up to 2 custom links. Upgrade to premium for unlimited links!");
      return;
    }

    const customLinkName = `custom_${Date.now()}`; // Unique name for form field
    const newCustomLink: CustomLink = {
      name: customLinkName,
      label: linkData.link_title,
      icon: "FaLink",
      isCustom: true
    };

    setAllPlatforms(prevPlatforms => [...prevPlatforms, newCustomLink]);

    // Set the URL value in the form
    setValue(customLinkName, linkData.link_url);

    toast.success("Custom link added successfully!");
  };

  // Update database function
  const updateToDatabase = async (email: string,
    formattedData: UserLinkPayload[]) => {
    setLoader(true);
    try {
      await fetch('/api/update-to-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
        },
        body: JSON.stringify({ filteredData: formattedData })
      });
      toast.success("Links saved successfully!");
    } catch (error) {
      toast.error('Unknown Error occurred');
      console.error('Failed to update', error);
    } finally {
      setLoader(false);
    }
  };
  const removeCustomLink = (platformName: string) => {
    setAllPlatforms(prevPlatforms =>
      prevPlatforms.filter(platform => platform.name !== platformName)
    );
    setValue(platformName, ""); // Clear form value
    toast.success("Custom link removed!");
  };
  // Form submission handler
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    if (!session || !session.user || !session.user.email) {
      toast.error("Make sure You're signed In");
      return;
    }

    // Format data for backend (maintaining compatibility)
    const formattedData = allPlatforms
      .map((platform) => {
        const inputValue = formData[platform.name] || "";

        if (!inputValue.trim()) {
          return null; // Skip empty fields
        }

        if ('baseUrl' in platform) {
          // Social platform - construct full URL from username
          return {
            icon: platform.icon,
            label: platform.label,
            link: platform.baseUrl + inputValue.trim()
          };
        } else {
          // Custom link - use full URL as provided
          return {
            icon: platform.icon,
            label: platform.label,
            link: inputValue.trim()
          };
        }
      })
      .filter((item): item is UserLinkPayload => item !== null);

    console.log("Formatted data for backend:", formattedData);
    updateToDatabase(session.user.email, formattedData);
  };

  if (error) {
    return <div className="min-h-[80vh] flex justify-center items-center">{error}</div>;
  }

  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="p-2 flex flex-col gap-6 items-center justify-center rounded-lg max-w-3xl mx-auto">
      <h1 className="text-center my-1 text-2xl font-medium underline underline-offset-2">Add Links</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allPlatforms.map((platform) => {
            const IconComponent = Icons[platform.icon as keyof typeof Icons];
            const fieldValue = watch(platform.name);
            const isCustomLink = 'isCustom' in platform;

            return (
              <div key={platform.name} className="flex flex-col relative gap-1">
                <div className="flex items-center gap-2 relative">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                  <Label htmlFor={platform.name} className="flex items-center gap-2">
                    {platform.label}
                    {isCustomLink && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary select-none">
                        Custom
                      </span>
                    )}
                  </Label>
                  {isCustomLink && (
                    <button
                      type="button"
                      onClick={() => removeCustomLink(platform.name)}
                      className="ml-auto p-1 rounded hover:bg-red-100 active:bg-red-200"
                      aria-label={`Delete custom link ${platform.label}`}
                    >
                      <Icons.FaTrash className="w-4 h-4 text-red-600 hover:text-red-700" />
                    </button>
                  )}
                </div>


                <Input
                  id={platform.name}
                  {...register(platform.name)}
                  placeholder={
                    isCustomLink
                      ? "Enter full URL (https://...)"
                      : `Enter ${platform.label} username`
                  }
                  className={`mt-2 text-muted-foreground pr-10 border rounded-md p-2 ${fieldValue ? "border-green-500" : "border-gray-300"
                    }`}
                />

                {fieldValue && (
                  <Check className="absolute -right-2 p-1 top-1/2 bg-green-600 rounded-full transform -translate-y-1/2 text-black" size={25} />
                )}

                {errors[platform.name] && (
                  <span className="text-red-500 text-sm">{errors[platform.name]?.message}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 items-center w-full">
          <AddCustomLink onLinkAdd={createCustomLink} />

          <Button type="submit" className="mt-6 w-full">
            {loader ? (
              <span className="flex items-center gap-1">
                <b>Saving.. </b>
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              <span>Save</span>
            )}
          </Button>

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