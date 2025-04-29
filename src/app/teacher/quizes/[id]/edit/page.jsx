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
import { useParams } from 'next/navigation'
import { api } from '../../../../../../convex/_generated/api'


const CreateCourse = () => {
     const params = useParams()
    const quiz = useQuery(api.quizes.getTasksById,{quizId:params.id})
    const updateTask = useMutation(api.quizes.updateTask)
    const courses = useQuery(api.courses.getTasks)
    
    const [title,setTitle] = useState("")
    const [passingPercentage,setPassingPercentage] = useState("")
    const [courseId,setCourseId] = useState("")
    

    const [loading,setLoading] = useState(false)

    if (quiz == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
      )

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                id:quiz._id,
                title: title.length > 0 ? title : quiz.title,
                passingPercentage: passingPercentage.length > 0 ? passingPercentage : quiz.passingPercentage,
                courseId:courseId.length > 0 ? courseId : quiz.courseId
            }
            console.log(data);
            updateTask(data)
            toast.success("Successful course creation")
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
                defaultValue={quiz.title}
                onChange = {(e) => setTitle(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Passing Percentage</Label>
                <Input 
                defaultValue={quiz.passingPercentage}
                onChange = {(e) => setPassingPercentage(e.target.value)}
                type="text" id="email" placeholder="Passing Percentage" />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Link to course --optional</Label>
                <Select
                defaultValue={quiz.courseId}
                onValueChange = {(value) => setCourseId(value)}
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