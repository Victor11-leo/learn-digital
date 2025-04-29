'use client'
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Loader, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { SignedIn, SignedOut,SignInButton, UserButton } from "@clerk/nextjs"

export default function LandingPage() {  
  const featuredCourses = useQuery(api.courses.getTasks)
  if (featuredCourses == undefined ) return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader className="animate-spin"/>
      </div>
  )  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Digital Learn</span>
          </div>          
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInButton>              
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
            </SignedOut>
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn, Grow, and Find Your Dream Job
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Digital Learn combines world-class courses with job opportunities to help you advance your career.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/student">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/student">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl" />
              <img
                src="https://plus.unsplash.com/premium_photo-1699114250038-1c6048f12264?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                alt="Digital Learn Platform"
                className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={550}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines learning and job opportunities in one place
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Comprehensive Courses</h3>
              <p className="text-muted-foreground">Access high-quality courses taught by industry experts</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Job Opportunities</h3>
              <p className="text-muted-foreground">Find relevant job postings that match your skills and interests</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Support</h3>
              <p className="text-muted-foreground">Connect with peers, instructors, and potential employers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Courses</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most popular courses and start learning today
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuredCourses.map((course) => (
              <Card key={course._id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full transition-all hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {course.category}
                    </span>                    
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="flex justify-between">                  
                  <Link href={`/student`}>
                    <Button variant="outline" size="sm">
                      Enroll now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/student">
              <Button variant="outline" size="lg">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students who are already learning and growing with Digital Learn
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Digital Learn</span>
              </div>
              <p className="text-sm text-muted-foreground">Learn, grow, and find your dream job with Digital Learn.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/teachers" className="text-sm text-muted-foreground hover:text-foreground">
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="text-sm text-muted-foreground hover:text-foreground">
                    Employers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Digital Learn. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Development",
    duration: "8 weeks",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 49.99,
    originalPrice: 99.99,
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    duration: "10 weeks",
    instructor: "Michael Chen",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 59.99,
    originalPrice: 129.99,
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Learn to create beautiful, user-friendly interfaces that delight users.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    duration: "6 weeks",
    instructor: "Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    price: 39.99,
    originalPrice: 89.99,
  },
]

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Engineer at Google",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "Digital Learn helped me transition from a marketing role to a software engineer. The courses were comprehensive and the job board connected me directly with employers.",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst at Microsoft",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "I completed the Data Science track and landed my dream job within two months. The hands-on projects really prepared me for real-world challenges.",
  },
  {
    name: "Marcus Johnson",
    role: "UX Designer at Adobe",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The design courses on Digital Learn are top-notch. I was able to build a portfolio that impressed employers and secured multiple job offers.",
  },
]
