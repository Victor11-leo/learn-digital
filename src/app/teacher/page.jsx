'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Loader } from 'lucide-react'

const page = () => {
  const courses = useQuery(api.courses.getTasks)
  const students = useQuery(api.students.getTasks)

  if (courses == undefined || students == undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )
  return (
    <div className='flex items-center gap-4 flex-wrap'>
        <Card className='w-[200px]'>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Total</CardDescription>            
          </CardHeader>          
          <CardContent>
            <p className='font-semibold text-2xl'>{courses.length}</p>
          </CardContent>
        </Card>
        <Card className='w-[200px]'>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Total</CardDescription>            
          </CardHeader>          
          <CardContent>
            <p className='font-semibold text-2xl'>{students.length}</p>
          </CardContent>
        </Card>
    </div>
  )
}

export default page