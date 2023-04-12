import Link from "next/link"
import {siteConfig} from "@/config/site"

import {Icons} from "@/components/icons"
import {MainNav} from "@/components/main-nav"
import {ThemeToggle} from "@/components/theme-toggle"
import {Button, buttonVariants} from "@/components/ui/button"
import {useSession, signOut} from "next-auth/react";

export function SiteHeader() {

  const {data: session} = useSession();


  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav}/>


        <div className="flex flex-1 items-center justify-end space-x-4">
          {session ? <Button onClick={() => signOut()} size="sm" variant="ghost">
            Wyloguj się
          </Button> : <Link href="/auth/login">
            <Button size="sm" variant="ghost">
              Zaloguj się
            </Button>
          </Link>}
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.gitHub className="h-5 w-5"/>
                <span className="sr-only">GitHub</span>
              </div>
            </Link>


            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current"/>
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            {session?.user?.email && <Link href={"#"}
                                           target="_blank"
                                           rel="noreferrer"
                                           onClick={(e) => {
                                             e.preventDefault()
                                             return signOut()
                                           }}
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-700 dark:text-slate-400",
                })}
              >
                <Icons.logOut className="h-5 w-5 fill-current"/>
                <span className="sr-only">Facebook</span>
              </div>
            </Link>}

            <ThemeToggle/>

          </nav>
        </div>
      </div>
    </header>
  )
}
