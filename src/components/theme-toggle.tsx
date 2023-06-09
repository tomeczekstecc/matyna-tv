import * as React from "react"
import {useTheme} from "next-themes"
import {Icons} from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Separator} from "@/components/ui/separator";
import {signOut, useSession} from "next-auth/react";
import router from "next/router";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function ThemeToggle() {
  const {setTheme} = useTheme()
  const {data: session} = useSession();

  // @deprecated
  // const renderTheme = (theme) => {
  //   switch (theme) {
  //     case 'dark':
  //       return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
  //     case 'light':
  //       return <Icons.moon className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
  //     case 'system':
  //       return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
  //     default:
  //       return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
  //   }
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/*{renderTheme(theme)}*/}
        <Icons.settings className="ml-2 h-5 w-5 opacity-75 hover:cursor-pointer"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" forceMount>
        {session?.user?.email && <>
          <span className={'ml-1 text-sm font-bold'}>Użytkownik</span>

          <DropdownMenuItem onClick={() => router.push('/auth/profile')}>
            <div className={'flex gap-1'}>
            <Avatar className={'h-5 w-5'} >
              <AvatarImage className={'text-white'} src={session.user.image || '/unknownUser.svg'}
                           alt={session.user?.name || session.user?.User?.email || 'logo użytkownika'}/>
              <AvatarFallback>{session.user?.name || 'UN'}</AvatarFallback>
            </Avatar>
            <span>{session.user.name} ({session.user.email})</span>
          </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/auth/profile')}>
            <Icons.profile className="mr-2 h-4 w-4"/>
            <span>Profil</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => signOut()}>
            <Icons.logOut className="mr-2 h-4 w-4"/>
            <span>Wyloguj się</span>
          </DropdownMenuItem>
          <Separator/>
        </>
        }


        <span className={'ml-1 text-sm font-bold'}>Motyw</span>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4"/>
          <span>Jasny</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4"/>
          <span>Ciemny</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4"/>
          <span>Systemowy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
