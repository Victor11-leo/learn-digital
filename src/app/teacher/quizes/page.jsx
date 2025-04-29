import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateCourse from "../components/CreateQuiz"
import CreateQuestion from "../components/CreateQuestion"
import CourseTable from "../components/QuizTable"

const page = () => {
  return (
    <Tabs defaultValue="overview" className="w-full px-8">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>        
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="create-question">Create Questions</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><CourseTable/></TabsContent>
      <TabsContent value="create"><CreateCourse/></TabsContent>
      <TabsContent value="create-question"><CreateQuestion/></TabsContent>
    </Tabs>

  )
}

export default page