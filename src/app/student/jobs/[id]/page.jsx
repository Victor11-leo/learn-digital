'use client'
import { useMutation, useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import LessonChosen from '../../components/LessonChosen'
import QuizChosen from '../../components/QuizChosen'

const page = () => {
    const params = useParams()
    const {user} = useUser()

    if (user == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
    )
    return <JobDetails user={user} jobId={params.id}/>
}


const JobDetails = ({user,jobId}) => {
    const job = useQuery(api.jobs.getTaskById,{jobId})
    const createApplication = useMutation(api.applicants.createTask)
    const applicant = useQuery(api.applicants.getTasksByUser,{userId:user.id})
    
    if (job == undefined || applicant == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
    )

    const match = applicant.find(item => item.jobId === job._id);
    
    const skills = job.skills.split(",")
  return (
    <div>
        
        <>            
            <h2 className='font-bold text-xl z-20'>{job.title}</h2>
            
            <p>{job.description}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <div className='flex items-center gap-1.5 flex-wrap pt-2 pb-6'>
                {skills.map((d,i) => (
                    <p className='text-xs bg-amber-500 text-white rounded-md px-2 py-1 w-fit' key={i}>{d}</p>
                ))}
            </div>
            <Button
            onClick = {() => {
                createApplication({
                    user:user.id,
                    jobId:job._id,
                    status:'ongoing'
                })

                toast.success("Congrats just applied")
            }}
            >Apply Now</Button>
        </>
            
    </div>
  )
}

export default page