'use client'
import { useMutation, useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
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
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { api } from '../../../../../../convex/_generated/api'

const page = () => {
    const params = useParams()
    const course = useQuery(api.courses.getTaskById,{courseId:params.id})
    const updateCourse = useMutation(api.courses.updateTask)

    const {user} = useUser()
    const [title,setTitle] = useState("")
    const [intro,setIntro] = useState("")
    const [description,setDescription] = useState("")
    const [image,setImage] = useState('')
    const [video,setVideo] = useState('')
    const [category,setCategory] = useState("")
    const [skills,setSkills] = useState("")

    const [loading,setLoading] = useState(false)

    if (course == undefined) return <Loader/>
    console.log(course);
    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                id:course?._id,
                title: title.length > 0 ? title : course.title,
                intro:intro.length > 0 ? intro : course.intro,
                description:description.length > 0 ? description : course.description,
                image:image.length > 0 ? image : course.image,
                video:video.length > 0 ? video : course.video,
                category:category.length > 0 ? category : course.category,
                instructor:user?.id,
                skills:skills.length > 0 ? skills : course.skills,
                status:'draft'
            }
            console.log(data);
            updateCourse(data)
            toast.success("Successful course updation")
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
                <Label htmlFor="email">Intro</Label>
                <Input 
                defaultValue={course?.intro}
                onChange = {(e) => setIntro(e.target.value)}
                type="text" id="email" placeholder="Intro" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Description</Label>
                <Textarea 
                defaultValue={course?.description}
                onChange = {(e) => setDescription(e.target.value)}
                placeholder="Type your description here." />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Image url</Label>
                <Input 
                defaultValue={course?.image}
                onChange = {(e) => setImage(e.target.value)}
                type="text" id="email" placeholder="Image url" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Preview video url</Label>
                <Input 
                defaultValue={course?.video}
                onChange = {(e) => setVideo(e.target.value)}
                type="text" id="email" placeholder="Preview video url" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Category</Label>
                <Select
                defaultValue={course?.category}
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
                defaultValue={course?.skills}
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

export default page