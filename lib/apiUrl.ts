// Centralized API URL resolver
// Picks server-side API_URL and client-side NEXT_PUBLIC_API_URL
export const getEnv = () => {
  // runtime check: if window is undefined, we're on the server
  const isServer = typeof window === "undefined";
  return {
    isServer,
    apiUrl: isServer ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL,
  };
};

function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const apiUrl: string = (() => {
  const { apiUrl } = getEnv();
  if (!apiUrl) {
    throw new Error(
      "Missing API base URL. Set API_URL (server) or NEXT_PUBLIC_API_URL (client) in env."
    );
  }
  return trimTrailingSlash(apiUrl);
})();

// Optional helper to join paths safely: apiUrl + path
export function buildApiUrl(path: string) {
  if (!path) return apiUrl;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${apiUrl}/${path.replace(/^\/+/, "")}`;
}
