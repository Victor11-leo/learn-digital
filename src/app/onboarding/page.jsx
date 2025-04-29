"use client"



import { useState } from "react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Package, Mail, Lock, AlertCircle, Loader } from "lucide-react"

import { useUser } from "@clerk/nextjs"
import { completeOnboarding } from "@/lib/onboarding"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)    
  const [error,setError] = useState(null)
  const [role,setRole] = useState(null)

  const {user} = useUser()
  if (user == undefined) return null  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")    

    setIsLoading(true)
    const formData = new FormData(e.target)
    // Simulate API call
    try {
      const res = await completeOnboarding(formData)
      router.push('/student')
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome {user?.firstName}</CardTitle>
              <CardDescription>Just a few more details and you're in</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="space-y-2">
                        <Label htmlFor="role">Choose your role</Label>
                        <Select 
                        name="role"
                        onValueChange={value => setRole(value)}
                        defaultValue="student">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="employer">Employer </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        {isLoading ? <Loader className="animate-spin"/> : "Complete"}                        
                    </Button>
                </form>            
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}