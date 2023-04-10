import {NavItem} from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
    logout: string
  }
}

export const siteConfig: SiteConfig = {
  name: "MartynaTV",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Filmy",
      href: "/films",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Media",
      href: "/media",
    },
    {
      title: "Sklep",
      href: "/sklep",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    logout: "#",
  },
}
