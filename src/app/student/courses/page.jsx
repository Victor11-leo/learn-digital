'use client'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'



const page = () => {
  const courses = useQuery(api.courses.getTasks)
  const {user} = useUser()  
  if (courses == undefined || user ==  undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )  
  return (
    <CourseList courses={courses} user={user}/>
  )
}


const CourseList = ({courses,user}) => {
  const student = useQuery(api.students.getTasksByUser,{userId:user.id})
  if (student == undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )  
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {courses.map((c) => {
        const skills = c.skills.split(",")
        const match = student.find(item => item.courseId === c._id);
        
        return (
          <Link 
          href={`/student/courses/${c._id}`}
          key={c._id}>
            <section            
            className='aspect-video w-[300px] shadow-md rounded-xl relative'
            >
              {match?.courseId == c._id &&
              (
                <div
                className='absolute top-2 right-2 bg-amber-500 p-2 rounded-full animate-pulse'
                />
              )
              }
              <div className='rounded-xl'>
                <img src={c.image} className='rounded-xl'/>
              </div>
              <div className='p-2'>
                <h2 className='font-semibold'>{c.title}</h2>
                <p className='text-sm'>{c?.description}</p>
                <div className='flex items-center gap-1.5 flex-wrap pt-2'>
                  {skills.map((d,i) => (
                    <p className='text-xs bg-amber-500 text-white rounded-md px-2 py-1 w-fit' key={i}>{d}</p>
                  ))}
                </div>
              </div>
            </section>
          </Link>
      )})}
    </div>
  )
}
export default page