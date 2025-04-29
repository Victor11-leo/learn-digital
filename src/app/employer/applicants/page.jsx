'use client'
import { useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Loader } from 'lucide-react'

import {Avatar,AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = timestamp - now;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months  = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years   = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(years) >= 1)   return rtf.format(years, 'year');
  if (Math.abs(months) >= 1)  return rtf.format(months, 'month');
  if (Math.abs(days) >= 1)    return rtf.format(days, 'day');
  if (Math.abs(hours) >= 1)   return rtf.format(hours, 'hour');
  if (Math.abs(minutes) >= 1) return rtf.format(minutes, 'minute');
  return rtf.format(seconds, 'second');
}

const page = () => {
  const applicants = useQuery(api.applicants.getTasks)
  const [data,setData] = useState([])
      
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch('/api/users')
      .then((res) => res.json())
      .then(data => {        
        setData(data.data)
      })
      
    }
    fetchUsers()
  },[])
  if (applicants == undefined || data.length == 0 ) return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader className="animate-spin"/>
      </div>
  )
  
  console.log(data);

  const merged = data?.map(user => {
    const applicant = applicants.find(p => p.user === user.id);
    return {
      ...user,
      ...applicant
    };
  });
  const withCourse = merged.filter(item => item.job);    
  console.log(withCourse);
  return (
    <div className='max-w-5xl mx-auto'>
      {withCourse.map((d) => {        
        const relativeTime = getRelativeTime(d._creationTime)
        return (
        <div key={d.id} className='flex items-center justify-between p-2 rounded-md shadow-md'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={d.imageUrl}/>
              <AvatarFallback>{d.firstName}</AvatarFallback>
            </Avatar>
            <div>
              <p>{d.firstName}</p>
              <p>{d.lastName}</p>
            </div>
          </div>
          <div>
            <p>{d.job.title}</p>
            <p>Started {relativeTime}</p>
          </div>
        </div>
      )})}
    </div>
  )
}

export default page