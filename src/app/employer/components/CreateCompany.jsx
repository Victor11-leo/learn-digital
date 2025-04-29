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
    const createTask = useMutation(api.companies.createTask)
    

    const {user} = useUser()
    const [name,setName] = useState("")
    const [website,setWebsite] = useState("")
    const [logo,setLogo] = useState("")
    const [description,setDescription] = useState("")
    const [status,setStatus] = useState("")    

    const [loading,setLoading] = useState(false)

    

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            const data = {
                name,
                website,                                
                description,
                logo,
                status:'active',                
            }
            console.log(data);
            createTask(data)
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
                onChange = {(e) => setName(e.target.value)}
                type="text" id="email" placeholder="Title" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Website</Label>
                <Input 
                onChange = {(e) => setWebsite(e.target.value)}
                type="text" id="email" placeholder="Intro" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Description</Label>
                <Textarea 
                onChange = {(e) => setDescription(e.target.value)}
                placeholder="Type your description here." />
            </div>
            
                    
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Logo url </Label>
                <Input
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