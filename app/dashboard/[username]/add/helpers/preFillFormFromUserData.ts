import { UseFormSetValue } from "react-hook-form";
import { UserLinks, PlatformConfig, Inputs } from "./types/add-link-types";
import { extractUsername } from "./extractUsername";

export const prefillFormFromUserData = (
  userData: UserLinks[],
  platforms: PlatformConfig[],
  setValue: UseFormSetValue<Inputs>
) => {
  userData.forEach((link) => {
    const platform = platforms.find(
      (p) => p.label.toLowerCase() === link.label.toLowerCase()
    );
    if (!platform) return;
    const value =
      "baseUrl" in platform
        ? extractUsername(link.link, platform.baseUrl)
        : link.link;
    setValue(platform.name, value);
  });
};
