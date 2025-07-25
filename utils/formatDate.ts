export const formatDate = (timestamp?: string | Date) => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};
