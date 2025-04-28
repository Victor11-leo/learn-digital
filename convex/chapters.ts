import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    title: v.string(),
    courseId:v.optional(v.id("courses"))    
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("chapters", 
        { 
            title: args.title, 
            courseId: args.courseId,             
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("chapters")        
        .order("desc")
        .collect();

        return tasks;
    },
});


export const updateTask = mutation({
    args: {
        id:v.id('chapters'),
        title: v.string(),
        courseId:v.optional(v.id("courses"))   
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            title: args.title, 
            courseId: args.courseId,             
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("chapters") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});