/**
 * Build full image URL from backend path
 * @param {string} imagePath - e.g. /uploads/products/image.webp
 * @returns {string}
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return "";

  // Already absolute URL
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Normalize slashes (avoid double slash)
  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  return `${base}${path}`;
};
