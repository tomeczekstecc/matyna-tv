import * as React from "react"
import {useTheme} from "next-themes"

import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const {setTheme, theme} = useTheme()

  console.log(theme)

  const renderTheme = (theme) => {
    switch (theme) {
      case 'dark':
        return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
      case 'light':
        return <Icons.moon className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
      case 'system':
        return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
      default:
        return <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"/>
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {renderTheme(theme)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4"/>
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4"/>
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4"/>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
