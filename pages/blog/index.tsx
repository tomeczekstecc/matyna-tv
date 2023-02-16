"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function IndexPage() {
  return (

    <div>
      {/*// TODO: only admin*/}
    <div className={'float-right'} >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="w-10 rounded-full p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Dodaj wpis bloga</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Dodaj wpis bloga</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
    </div>
  )
}