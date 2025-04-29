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

const StudentLayout = ({children}) => {
  const {user} = useUser()
  const data = {
    user: {
      name: user?.firstName,
      email: user?.emailAddresses[0].emailAddress,
      avatar: user?.imageUrl,
    },
    navMain: [
      // {
      //   title: "Dashboard",
      //   url: "/student",
      //   icon: LayoutDashboardIcon,
      // },
      {
        title: "Courses",
        url: "/student/courses",
        icon: ListIcon,
      },
      {
        title: "Jobs",
        url: "/student/jobs",
        icon: UsersIcon,
      },
      {
        title: "Certificates",
        url: "/student/certificates",
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

export default StudentLayout