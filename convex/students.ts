import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    user: v.string(),
    courseId: v.id("courses"),    
    certificateId: v.optional(v.id("certificates")),    
    status: v.string(), 
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("students", 
        { 
            user: args.user,                         
            courseId: args.courseId,                         
            certificateId: args.certificateId,                         
            status: args.status,                         
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("students")        
        .order("desc")
        .collect();

        // return tasks;
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
        courseId: v.id("courses"),    
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("students")        
        .withIndex("by_courseId",(q) => q.eq("courseId",args.courseId))
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTasksByUser = query({
    args: {
        userId: v.string(),    
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("students")        
        .withIndex("by_userId",(q) => q.eq("user",args.userId))
        .order("desc")
        .collect();

        return tasks;
    },
});

export const updateTask = mutation({
    args: {
        id:v.id('students'),
        user: v.string(),
        courseId: v.id("courses"),    
        certificateId: v.optional(v.id("certificates")),    
        status: v.string(),
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            user: args.user,                         
            courseId: args.courseId,                         
            certificateId: args.certificateId,                         
            status: args.status,                                  
        });
      
    },
});




