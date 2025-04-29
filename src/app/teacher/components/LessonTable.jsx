"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Ellipsis, Loader } from "lucide-react"
import Link from "next/link"



export default function TableDemo() {
  const courses = useQuery(api.lessons.getTasks)
  const deleteCourse = useMutation(api.lessons.deleteTask)
  const updateCourse = useMutation(api.lessons.updateTaskStatus)
  if (courses == undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )
  
  return (
    <Table>
      <TableCaption>A list of your lessons.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>          
          <TableHead>Course</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((c) => (
          <TableRow key={c._id}>
            <TableCell className="font-medium">{c.title}</TableCell>            
            <TableCell className='capitalize'>{c.course.title}</TableCell>
            <TableCell className="">
            <DropdownMenu>
              <DropdownMenuTrigger><Ellipsis/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/teacher/lessons/${c._id}/edit`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>               
                <DropdownMenuItem onClick={() => deleteCourse({id:c._id})}>Delete</DropdownMenuItem>                
              </DropdownMenuContent>
            </DropdownMenu>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  )
}
