import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateCourse from "../components/CreateJob"
import CourseTable from "../components/JobTable"

const page = () => {
  return (
    <Tabs defaultValue="overview" className="w-full px-8">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>        
        <TabsTrigger value="create">Create</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><CourseTable/></TabsContent>
      <TabsContent value="create"><CreateCourse/></TabsContent>
    </Tabs>

  )
}

export default page