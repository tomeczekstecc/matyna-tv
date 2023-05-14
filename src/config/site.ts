import {NavItem} from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "MartynaTV",
  description:
    "Blog MartynaTV - blog o filmach, serialach, książkach, grach i nie tylko.",
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
      admin: true,
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
  },
}
