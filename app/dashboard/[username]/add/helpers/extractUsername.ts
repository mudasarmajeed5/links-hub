export const extractUsername = (fullUrl: string, baseUrl: string): string => {
  if (!fullUrl) return "";
  return fullUrl.replace(baseUrl, "");
};
