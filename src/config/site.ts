const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";

export const siteConfig = {
  title: "Job Portal",
  description: "Job Portal",
  siteUrl,
  apiBaseUrl,
  robots: "noindex, nofollow",
  author: {
    name: "Team-AI",
    website: "#",
  },
  links: {
    linkedIn: "#",
    github: "#",
  },
};

export type SiteConfig = typeof siteConfig;
