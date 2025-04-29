import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    userId: v.string(),    
    courseId: v.id('courses'),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("certifications", 
        { 
            userId: args.userId,             
            courseId: args.courseId,             
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("certifications")        
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
        .query("certifications")    
        .withIndex("by_userId",(q) => q.eq("userId",args.userId))    
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




