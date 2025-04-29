'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,    
    SelectItem,    
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'

import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { api } from '../../../../../../convex/_generated/api'


const CreateCourse = () => {
    const params = useParams()
    
    const course = useQuery(api.lessons.getTasksById,{lessonId:params.id})
    const updateTask = useMutation(api.lessons.updateTask)
    const courses = useQuery(api.courses.getTasks)
    
    const [title,setTitle] = useState("")    
    const [instructorNotes,setInstructorNotes] = useState("")
    const [content,setContent] = useState("")
    const [video,setVideo] = useState("")
    const [chapter,setChapter] = useState("")
    

    const [loading,setLoading] = useState(false)

    if (courses == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
      )

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                id:course._id,
                title:title.length > 0 ? title : course.title,
                instructorNotes:instructorNotes.length > 0 ? instructorNotes : course?.instructorNotes,
                content:content.length > 0 ? content : course.content,
                video:video.length > 0 ? video : course.video,
                chapterId:chapter.length > 0 ? chapter : course.chapterId
            }
            console.log(data);
            updateTask(data)
            toast.success("Successful lesson creation")
            setLoading(false)
            
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong",{
                description:error.message
            })
            setLoading(false)
        }
    }
  return (
    <section className='grid gap-4.5'>
        <div className='grid grid-cols-2 gap-4'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Title</Label>
                <Input 
                defaultValue={course?.title}
                onChange = {(e) => setTitle(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Instructor notes</Label>
                <Textarea 
                defaultValue={course?.instructorNotes}
                onChange = {(e) => setInstructorNotes(e.target.value)}
                placeholder="Type your Instructor notes here." />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Content</Label>
                <Textarea 
                defaultValue={course?.content}
                onChange = {(e) => setContent(e.target.value)}
                placeholder="Type your Content here." />
            </div>            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Video</Label>
                <Input 
                defaultValue={course?.video}
                onChange = {(e) => setVideo(e.target.value)}
                type="text" id="email" placeholder="Preview video url" />
            </div>                    
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Link to chapter --optional</Label>
                <Select
                defaultValue={course?.chapterId}
                onValueChange = {(value) => setChapter(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((c) => (
                            <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
                        ))}                        
                    </SelectContent>
                </Select>
            </div>    
        </div>
        <Button 
        disabled={loading}
        onClick={handleSubmit}>{loading ? <Loader className='animate-spin'/> : "Create Course"}</Button>
    </section>
  )
}

export default CreateCourse