/**
 * Build full image URL from backend path
 * @param {string} imagePath
 * @returns {string}
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return "";

  // If already absolute URL
  if (imagePath.startsWith("http")) return imagePath;

  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  return `${BACKEND_URL.replace(/\/$/, "")}/${imagePath.replace(/^\//, "")}`;
};
