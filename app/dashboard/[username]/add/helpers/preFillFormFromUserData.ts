import { UseFormSetValue } from "react-hook-form";
import { UserLinks, PlatformConfig, Inputs, CustomLink } from "./types/add-link-types";
import { extractUsername } from "./extractUsername";

export const prefillFormFromUserData = (
  userData: UserLinks[],
  platforms: PlatformConfig[],
  setValue: UseFormSetValue<Inputs>,
  setPlatforms: (platforms: PlatformConfig[]) => void
) => {
  const newCustomLinks: PlatformConfig[] = [];

  userData.forEach((link) => {
    const matchedPlatform = platforms.find(
      (p) => p.label.toLowerCase() === link.label.toLowerCase()
    );

    if (!matchedPlatform) {
      // Treat as custom link
      const customLinkName = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

      const customLink: CustomLink = {
        name: customLinkName,
        label: link.label,
        icon: "FaLink",
        isCustom: true,
      };

      newCustomLinks.push(customLink);
      setValue(customLinkName, link.link);
    } else {
      // Built-in platform
      const value =
        "baseUrl" in matchedPlatform
          ? extractUsername(link.link, matchedPlatform.baseUrl)
          : link.link;

      setValue(matchedPlatform.name, value);
    }
  });

  if (newCustomLinks.length > 0) {
    setPlatforms([...platforms, ...newCustomLinks]);
  }
};
