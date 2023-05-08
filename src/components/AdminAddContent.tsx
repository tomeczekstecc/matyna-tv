import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

const AdminAddContent = ({tooltipText, href}) => {


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button variant="outline" className="w-10 rounded-full p-0">
              <Plus className="h-4 w-4"/>
              <span className="sr-only">{tooltipText}</span>
            </Button></Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default AdminAddContent;
