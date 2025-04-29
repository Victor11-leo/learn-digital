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
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'


const CreateCourse = () => {
    const createTask = useMutation(api.courses.createTask)
    const {user} = useUser()
    const [title,setTitle] = useState("")
    const [intro,setIntro] = useState("")
    const [description,setDescription] = useState("")
    const [image,setImage] = useState("")
    const [video,setVideo] = useState("")
    const [category,setCategory] = useState("")
    const [skills,setSkills] = useState("")

    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                title,
                intro,
                description,
                image,
                video,
                category,
                instructor:user?.id,
                skills,
                status:'draft'
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
                <Label htmlFor="email">Intro</Label>
                <Input 
                onChange = {(e) => setIntro(e.target.value)}
                type="text" id="email" placeholder="Intro" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Description</Label>
                <Textarea 
                onChange = {(e) => setDescription(e.target.value)}
                placeholder="Type your description here." />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Image url</Label>
                <Input 
                onChange = {(e) => setImage(e.target.value)}
                type="text" id="email" placeholder="Image url" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Preview video url</Label>
                <Input 
                onChange = {(e) => setVideo(e.target.value)}
                type="text" id="email" placeholder="Preview video url" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Category</Label>
                <Select
                onValueChange = {(value) => setCategory(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Skills <span className='text-sm'>Use commas to separate them</span></Label>
                <Textarea 
                onChange = {(e) => setSkills(e.target.value)}
                placeholder="Type your skills here." />
            </div>
        </div>
        <Button 
        disabled={loading}
        onClick={handleSubmit}>{loading ? <Loader className='animate-spin'/> : "Create Course"}</Button>
    </section>
  )
}

export default CreateCourse