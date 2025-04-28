import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  courses: defineTable({
    title: v.string(),
    intro: v.string(),
    description: v.string(),
    image: v.string(),
    video: v.string(),
    category: v.string(),
    instructor: v.string(), //userId
    skills: v.string(),
    status: v.string(), //published or draft    
  }).index("by_instructor", ["instructor"]),  
  chapters: defineTable({
    title: v.string(),
    courseId:v.optional(v.id("courses"))    
  }),  
  lessons: defineTable({
    title: v.string(),    
    video: v.string(),    
    instructorNotes: v.string(),    
    content: v.string(),    
    chapterId: v.optional(v.id("chapters")),    
  }),  
  quizes: defineTable({
    title: v.string(),    
    passingPercentage: v.string(),    
    courseId:v.optional(v.id("courses"))        
  }),  
  questions: defineTable({
    question: v.string(),    
    answers: v.array(v.object({
        option:v.string(),
        correct:v.boolean(),
    })),        
    quizId:v.optional(v.id("quizes"))  
  }),  
  certifications: defineTable({
    userId: v.string(),    
    courseId: v.id('courses'),        
  }).index("by_userId", ["userId"]),  
  jobs: defineTable({
    title: v.string(),
    category: v.string(), //should match 
    skills: v.string(), //should match 
    type: v.string(), //full-time ...
    location: v.string(),
    status: v.string(), //open    
    description: v.string(), //open 
    companyId:v.id('companies'),       
    employer:v.string(),       
  }).index("by_employer", ["employer"]),  
  companies: defineTable({
    name: v.string(),
    website: v.string(), //full-time ...
    logo: v.string(),
    status: v.string(), //open    
    description: v.string(), //open        
  }),  
  students: defineTable({
    user: v.string(),
    courseId: v.id("courses"),    
    certificateId: v.optional(v.id("certificates")),    
    status: v.string(), //ongoing or complete or banned       
  }).index("by_courseId", ["courseId"]),  
  applicants: defineTable({
    user: v.string(),
    jobId: v.id("jobs"),    
    status: v.string(), //ongoing or complete or banned       
  }).index("by_jobId", ["jobId"]),  
});