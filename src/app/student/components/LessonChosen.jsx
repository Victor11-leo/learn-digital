'use client'

import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const LessonChosen = ({lesson,setLessonSelected}) => {
    console.log(lesson);
    const router = useRouter()
  return (
    <div>
        <video
            controls
            width="100%"
            className="rounded-lg shadow-md"
        >
            <source src={lesson.video} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <h2 className='font-semibold text-lg'>{lesson.title}</h2>
        <div className='grid gap-4 my-3'>
            <p>{lesson.instructorNotes}</p>
            <p>{lesson.content}</p>
        </div>
        <div className='flex items-center gap-2'>
            <Button><Check/> Mark as complete</Button>
            <Button onClick={() => setLessonSelected(null)} variant='outline'><ArrowLeft/> Go back</Button>
        </div>
    </div>
    
  )
}

export default LessonChosen