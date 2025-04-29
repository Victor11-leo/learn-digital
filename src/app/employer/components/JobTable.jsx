"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Ellipsis, Loader } from "lucide-react"
import Link from "next/link"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TableDemo() {
  const courses = useQuery(api.jobs.getTasks)
  const deleteCourse = useMutation(api.jobs.deleteTask)
  const updateCourse = useMutation(api.jobs.updateTask)

  if (courses == undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )
  
  return (
    <Table>
      <TableCaption>A list of your jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((c) => (
          <TableRow key={c._id}>
            <TableCell className="font-medium">{c.title}</TableCell>
            <TableCell className='capitalize'>{c.status}</TableCell>
            <TableCell className='capitalize'>{c.category}</TableCell>
            {c.company == undefined ?
            <TableCell className='capitalize'>null</TableCell>
            :
            <TableCell className='capitalize'>{c.company.name}</TableCell>
            }
            <TableCell className="">
            <DropdownMenu>
              <DropdownMenuTrigger><Ellipsis/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/employer/jobs/${c._id}/edit`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>                
                <DropdownMenuItem onClick={() => deleteCourse({id:c._id})}>Delete</DropdownMenuItem>                
              </DropdownMenuContent>
            </DropdownMenu>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  )
}
