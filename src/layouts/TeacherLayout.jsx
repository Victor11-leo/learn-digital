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


const TeacherLayout = ({children}) => {
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
        url: "/teacher",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Courses",
        url: "/teacher/courses",
        icon: ListIcon,
      },
      {
        title: "Students",
        url: "/teacher/students",
        icon: UsersIcon,
      },
      {
        title: "Lessons",
        url: "/teacher/lessons",
        icon: FolderIcon,
      },
      {
        title: "Quizes",
        url: "/teacher/quizes",
        icon: FileQuestion,
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

export default TeacherLayout