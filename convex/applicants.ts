import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    user: v.string(),
    jobId: v.id("jobs"),    
    status: v.string(), //ongoing or complete or banned       
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("applicants", 
        { 
            user: args.user,                         
            jobId: args.jobId,                         
            status: args.status,                         

        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("applicants")        
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTasksByCourse = query({
    args: {
        jobId: v.id("jobs"),    
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("applicants")        
        .withIndex("by_jobId",(q) => q.eq("jobId",args.jobId))
        .order("desc")
        .collect();

        return tasks;
    },
});

export const updateTask = mutation({
    args: {
        id:v.id('applicants'),
        user: v.string(),
        jobId: v.id("jobs"),    
        status: v.string(), //ongoing or complete or banned       
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            user: args.user,                         
            jobId: args.jobId,                         
            status: args.status,                         
        });
      
    },
});

