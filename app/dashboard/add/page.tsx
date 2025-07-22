"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTitle } from "@/hooks/useTitle";
import { socialPlatforms } from "@/constants/userLinks";
// helper functions
import { AddCustomLink } from "./components/AddCustomLink";
import { prefillFormFromUserData } from "./helpers/preFillFormFromUserData";
import { formatFormData } from "./helpers/formatFormData";
import { PlatformInput } from "./components/PlatformInput";

// types
import { PlatformConfig, CustomLink, UserLinkPayload } from "./helpers/types/add-link-types";
import { useUserStore } from "@/store/useUserStore";

interface Inputs {
  [key: string]: string;
}

const AddLink = () => {
  const router = useRouter();
  const { user, loading, fetchUser } = useUserStore();
  
  const userData = user?.userLinks;
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState(false);
  const [allPlatforms, setAllPlatforms] = useState<PlatformConfig[]>(socialPlatforms);
  useTitle(`${session?.user.username} - Add Links`);
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
    if (status == "authenticated") {
      fetchUser()
    }
  }, [status]);

  // Populate form with existing user data
  useEffect(() => {
    if (userData && userData.length > 0) {
      prefillFormFromUserData(userData, allPlatforms, setValue, setAllPlatforms);
    }
  }, [userData]);

  const createCustomLink = (linkData: { link_url: string, link_title: string }) => {
    const isPremiumUser = user?.isPremiumUser || false;
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
    const formattedData = formatFormData(formData, allPlatforms);
    updateToDatabase(session.user.email, formattedData);
  };


  if (loading) {
    return <div className="min-h-[80vh] flex justify-center items-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="p-2 flex flex-col gap-6 items-center justify-center rounded-lg max-w-3xl mx-auto">
      <h1 className="text-center my-1 text-2xl font-medium underline underline-offset-2">Add Links</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allPlatforms.map((platform) =>
            <PlatformInput
              key={platform.name}
              platform={platform}
              register={register}
              watch={watch}
              errors={errors}
              removeCustomLink={removeCustomLink}
            />
          )}
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
            onClick={() => router.push(`/dashboard/theme`)}
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