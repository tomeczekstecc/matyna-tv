import {NavItem} from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    gitlab: string
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
      href: "/store",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/tomeczekstecc/matyna-tv",
    gitlab: "https://gitlab.com/tomeczekstecc/martyna-tv",
    docs: "https://ui.shadcn.com",
  },
}
