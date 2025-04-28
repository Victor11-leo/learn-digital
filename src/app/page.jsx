import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'
import React from 'react'

const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset'/>
      <SidebarInset>
        <SiteHeader/>
        <div>
          Hi
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page