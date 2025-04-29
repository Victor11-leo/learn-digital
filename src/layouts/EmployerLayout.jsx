"use client"

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'

import {    
  FileQuestion,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react"
import { useUser } from '@clerk/nextjs'

const EmployerLayout = ({children}) => {
  const {user} = useUser()
  const data = {
    user: {
      name: user?.firstName,
      email: user?.emailAddresses[0].emailAddress,
      avatar: user?.imageUrl,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/employer",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Jobs",
        url: "/employer/jobs",
        icon: ListIcon,
      },
      {
        title: "Applicants",
        url: "/employer/applicants",
        icon: UsersIcon,
      },
      {
        title: "Companies",
        url: "/employer/companies",
        icon: FolderIcon,
      },      
    ],  
  }
  return (
    <SidebarProvider>
      <AppSidebar data={data} variant='inset'/>
      <SidebarInset>
        <SiteHeader/>
        <div className='p-4'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default EmployerLayout