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
    const company = useQuery(api.companies.getTasksById,{companyId:params.id})
    const updateTask = useMutation(api.companies.updateTask)
    

    const [name,setName] = useState("")
    const [website,setWebsite] = useState("")
    const [logo,setLogo] = useState("")
    const [description,setDescription] = useState("")
    const [status,setStatus] = useState("")    

    const [loading,setLoading] = useState(false)

    if (company == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
      )

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                id:company._id,
                name:name.length > 0 ? name : company.name,
                website:website.length > 0 ? website : company.website,                                
                description:description.length > 0 ? description : company.description,
                logo:logo.length > 0 ? logo : company.logo,
                status:status.length > 0 ? status : company.status,                
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
                <Label htmlFor="email">Name</Label>
                <Input 
                defaultValue={company.name}
                onChange = {(e) => setName(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Website</Label>
                <Input 
                defaultValue={company.website}
                onChange = {(e) => setWebsite(e.target.value)}
                type="text" id="email" placeholder="Intro" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Description</Label>
                <Textarea 
                defaultValue={company.description}
                onChange = {(e) => setDescription(e.target.value)}
                placeholder="Type your description here." />
            </div>
            
                    
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Logo url </Label>
                <Input
                defaultValue={company.logo}
                onChange = {(e) => setLogo(e.target.value)}
                placeholder="Type your logo url." />
            </div>            
        </div>
        <Button 
        disabled={loading}
        onClick={handleSubmit}>{loading ? <Loader className='animate-spin'/> : "Create Course"}</Button>
    </section>
  )
}

export default CreateCourse