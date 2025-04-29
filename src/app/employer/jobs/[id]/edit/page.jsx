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

    const job = useQuery(api.jobs.getTaskById,{jobId:params.id})
    const updateTask = useMutation(api.jobs.updateTask)
    const companies = useQuery(api.companies.getTasks)

    const {user} = useUser()
    const [title,setTitle] = useState("")
    const [type,setType] = useState("")
    const [location,setLocation] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [skills,setSkills] = useState("")
    const [status,setStatus] = useState("")
    const [companyId,setCompanyId] = useState("")

    const [loading,setLoading] = useState(false)

    if (job == undefined || companies == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
      )

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                id:job._id,
                title:title.length > 0 ? title : job.title,
                type:type.length  > 0 ? type : job.type,                
                location:location.length  > 0 ? location : job.location,
                description:description.length  > 0 ? description : job.description,
                category:category.length  > 0 ? category : job.category,
                skills:skills.length  > 0 ? skills : job.skills,
                companyId:companyId.length > 0 ? companyId : job.companyId,
                status:status.length  > 0 ? status : job.status,
                employer:user?.id
            }
            console.log(data);
            updateTask(data)
            toast.success("Successful job creation")
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
        <div className='grid grid-cols-1 gap-4'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Title</Label>
                <Input 
                defaultValue={job.title}
                onChange = {(e) => setTitle(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Location</Label>
                <Input 
                defaultValue={job.location}
                onChange = {(e) => setLocation(e.target.value)}
                type="text" id="email" placeholder="Intro" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Description</Label>
                <Textarea 
                defaultValue={job.description}
                onChange = {(e) => setDescription(e.target.value)}
                placeholder="Type your description here." />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Category</Label>
                <Select
                defaultValue={job.category}
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
                <Label htmlFor="email">Type</Label>
                <Select
                defaultValue={job.type}
                onValueChange = {(value) => setType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full time</SelectItem>
                        <SelectItem value="part-time">Part time</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Status</Label>
                <Select
                defaultValue={job.status}
                onValueChange = {(value) => setStatus(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Skills <span className='text-sm'>Use commas to separate them</span></Label>
                <Textarea 
                defaultValue={job.skills}
                onChange = {(e) => setSkills(e.target.value)}
                placeholder="Type your skills here." />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Link to company --optional</Label>
                <Select
                defaultValue={job.companyId}
                onValueChange = {(value) => setCompanyId(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.length > 0 ? "No comapanies" :
                        <>
                            {companies.map((c) => (
                                <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
                            ))}                        
                        </>
                        }
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