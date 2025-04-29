import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    title: v.string(),    
    passingPercentage: v.string(),    
    courseId:v.optional(v.id("courses")) 
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("quizes", 
        { 
            title: args.title, 
            passingPercentage: args.passingPercentage, 
            courseId: args.courseId, 
            
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("quizes")        
        .order("desc")
        .collect();

        
        return Promise.all(
          tasks.map(async (booking) => {
            const course = await ctx.db.get(booking.courseId);
            return {
              ...booking,
              course
            };
          })
        );
    },
});

export const getTasksByCourse = query({
    args: {
      courseId:v.optional(v.id("courses")) 
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("quizes") 
        .withIndex("by_courseId",(q) => q.eq("courseId",args.courseId))       
        .order("desc")
        .collect();

        
        return Promise.all(
          tasks.map(async (booking) => {
            const course = await ctx.db.get(booking.courseId);
            return {
              ...booking,
              course
            };
          })
        );
    },
});

export const getTasksById = query({
    args: {
      quizId:v.id("quizes")
    },
    handler: async (ctx, args) => {
      const tasks =await ctx.db.get(args.quizId);
  
      return tasks
    },
});


export const updateTask = mutation({
    args: {
        id:v.id('quizes'),
        title: v.string(),    
        passingPercentage: v.string(),    
        courseId:v.optional(v.id("courses")) 
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            title: args.title, 
            passingPercentage: args.passingPercentage, 
            courseId: args.courseId, 
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("quizes") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});