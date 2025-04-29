"use client"

import { AppSidebar, LearnerSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { LearnerHeader, SiteHeader } from '@/components/site-header'

import {      
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react"
import { useUser } from '@clerk/nextjs'

const LearningLayout = ({children}) => {
    
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
        url: "/student",
        icon: LayoutDashboardIcon,
      },
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
      <LearnerSidebar data={data} variant='inset'/>
      <SidebarInset>
        <LearnerHeader/>
        <div className='w-full'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LearningLayout