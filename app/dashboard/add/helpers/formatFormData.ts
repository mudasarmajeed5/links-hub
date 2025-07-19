import { PlatformConfig, UserLinkPayload, Inputs } from "./types/add-link-types";

export const formatFormData = (
  formData: Inputs,
  platforms: PlatformConfig[]
): UserLinkPayload[] => {
  return platforms
    .map((platform) => {
      const inputValue = formData[platform.name] || "";
      if (!inputValue.trim()) return null;

      return {
        icon: platform.icon,
        label: platform.label,
        link:
          "baseUrl" in platform
            ? platform.baseUrl + inputValue.trim()
            : inputValue.trim(),
      };
    })
    .filter((item): item is UserLinkPayload => item !== null);
};
