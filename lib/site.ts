import { siteConfig } from "@/config/site";

export { siteConfig };

export function getSiteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
