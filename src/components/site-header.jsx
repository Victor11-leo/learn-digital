import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Digi Learn .</h1>
      </div>
    </header>
  )
}

export function LearnerHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear ">
      <div className="flex  items-center gap-1 px-2 lg:gap-2 absolute right-3 top-3">
        <SidebarTrigger className="-ml-1" />
        
        <h1 className="text-base font-medium">Learn .</h1>
      </div>
    </header>
  )
}
