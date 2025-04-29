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
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'


const CreateCourse = () => {
    const createTask = useMutation(api.quizes.createTask)
    const courses = useQuery(api.courses.getTasks)
    
    const [title,setTitle] = useState("")
    const [passingPercentage,setPassingPercentage] = useState("")
    const [courseId,setCourseId] = useState("")
    

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
                title,
                passingPercentage,
                courseId:courseId.length > 0 ? courseId : undefined
            }
            console.log(data);
            createTask(data)
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
                onChange = {(e) => setTitle(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Passing Percentage</Label>
                <Input 
                onChange = {(e) => setPassingPercentage(e.target.value)}
                type="text" id="email" placeholder="Passing Percentage" />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Link to course --optional</Label>
                <Select
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