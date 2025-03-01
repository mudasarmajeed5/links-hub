export const formatDate = (timestamp: string) => {
  if (!timestamp) return "N/A"; // Handle empty values

  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};
