'use client'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const page = () => {
  const jobs = useQuery(api.jobs.getTasks)  
    const {user} = useUser()  
    if (jobs == undefined || user ==  undefined) return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader className="animate-spin"/>
      </div>
    )  
  return (
    <JobList jobs={jobs} user={user}/>
  )
}


const JobList = ({jobs,user}) => {
  const applicants = useQuery(api.applicants.getTasksByUser,{userId:user.id})
  const certifications = useQuery(api.certifications.getTasksByUser,{userId:user.id})
  const createApplication = useMutation(api.applicants.createTask)
  if (applicants == undefined || certifications == undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  ) 
  // console.log(jobs);
  // console.log(certifications)
  const filteredJobs = jobs.filter(job => {
    const jobSkills = job.skills.toLowerCase().split(',').map(s => s.trim());
  
    return certifications.some(cert => {
      const courseSkills = cert.course.skills?.toLowerCase().split(',').map(s => s.trim()) || [];
      return jobSkills.some(skill => courseSkills.includes(skill));
    });
  });

  
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {filteredJobs.length < 1 && (
        <p>You lack the skills to do apply for the jobs, please do more certifications</p>
      )}
      {filteredJobs.map((c) => {
        const skills = c.skills.split(",")
        const match = applicants.find(item => item.jobId === c._id);        
        return (
          
            <section            
            key={c._id}
            className='aspect-video w-[300px] shadow-md rounded-xl relative'
            >
              {match?.jobId == c._id &&
              (
                <div
                className='absolute top-2 right-2 bg-amber-500 p-2 rounded-full animate-pulse'
                />
              )
              }
              
              <div className='p-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>{c.title}</h2>
                    <h2 className='font-semibold'>{c.location}</h2>
                  </div>
                  {c.company != undefined && (
                    <div>
                      <p className='text-sm'>{c.company.name}</p> 
                      <img src={c.company.logo}/>
                    </div>
                  )}
                </div>
                
                <p className='text-sm'>{c.type}</p>
                <div className='flex items-center gap-1.5 flex-wrap my-2'>
                  {skills.map((d,i) => (
                    <p className='text-xs bg-amber-500 text-white rounded-md px-2 py-1 w-fit' key={i}>{d}</p>
                  ))}
                </div>
                <Button
                onClick = {() => {
                    createApplication({
                        user:user.id,
                        jobId:c._id,
                        status:'ongoing'
                    })
    
                    toast.success("Congrats just applied")
                }}
                >Apply Now</Button>
              </div>
            </section>          
      )})}
    </div>
  )
}

export default page