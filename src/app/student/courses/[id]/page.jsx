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
    return <CourseDetails user={user} courseId={params.id}/>
}


const CourseDetails = ({user,courseId}) => {
    const course = useQuery(api.courses.getTaskById,{courseId})
    const createCertificate = useMutation(api.certifications.createTask)
    const createStudent = useMutation(api.students.createTask)
    const student = useQuery(api.students.getTasksByUser,{userId:user.id})
    const lessons = useQuery(api.lessons.getTasksByChapter,{chapterId:courseId})
    const quizes = useQuery(api.quizes.getTasksByCourse,{courseId})

    const [lessonSelected,setLessonSelected] = useState(null)
    const [quizSelected,setQuizSelected] = useState(null)

    if (course == undefined || student == undefined || lessons == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
    )

    const match = student.find(item => item.courseId === course._id);
    
    const skills = course.skills.split(",")
  return (
    <div>
        
        {student.length < 1 && match == undefined ?
        <>
            <section className='w-full h-[250px] bg-amber-500 rounded-xl overflow-hidden relative'>            
                <img
                src={course.image}            
                className='object-cover'
                />
            </section>

            <h2 className='font-bold text-xl z-20'>{course.title}</h2>
            <p>{course.description}</p>
            <div className='flex items-center gap-1.5 flex-wrap pt-2 pb-6'>
                {skills.map((d,i) => (
                    <p className='text-xs bg-amber-500 text-white rounded-md px-2 py-1 w-fit' key={i}>{d}</p>
                ))}
            </div>
            <Button
            onClick = {() => {
                createStudent({
                    user:user.id,
                    courseId:course._id,
                    status:'ongoing'
                })

                toast.success("Congrats just enrolled")
            }}
            >Enroll Now</Button>
        </>
        :
        <>
        {lessonSelected == null && quizSelected == null && (
            <section>
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-xl z-20'>{course.title}</h2>
                    <Button onClick={() => {
                        createCertificate({
                            userId:user.id,
                            courseId:course._id
                        })

                        toast.success("Congrats on getting certified")
                    } }>Get certificate</Button>
                </div>
                <div>
                    <h3 className='font-semibold text-lg'>Lessons</h3>
                    {lessons.length < 1 ? 
                    <>
                        <p>No lessons yet</p>
                    </>
                    :
                    <>
                        <p>{lessons.length} Lessons</p>
                        {lessons.map((d) => (
                            <div 
                            onClick={() => setLessonSelected(d)}
                            className='p-2 rounded-md' key={d._id}>
                                <h4>{d.title}</h4>
                            </div>
                        ))}
                    </>
                    }
                </div>
                <div>
                    <h3 className='font-semibold text-lg'>Quizes</h3>
                    {quizes.length < 1 ? 
                    <>
                        <p>No lessons yet</p>
                    </>
                    :
                    <>
                        <p>{quizes.length} Lessons</p>
                        {quizes.map((d) => (
                            <div 
                            onClick={() => setQuizSelected(d)}
                            className='p-2 rounded-md' key={d._id}>
                                <h4>{d.title}</h4>
                            </div>
                        ))}
                    </>
                    }
                </div>
            </section>
        )}
        {lessonSelected != null && <LessonChosen setLessonSelected={setLessonSelected} lesson={lessonSelected}/>}
        {quizSelected != null && <QuizChosen setQuizSelected={setQuizSelected} quiz={quizSelected}/>}
        </>

        }
    </div>
  )
}

export default page