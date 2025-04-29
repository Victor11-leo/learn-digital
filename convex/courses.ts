import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    title: v.string(),
    intro: v.string(),
    description: v.string(),
    image: v.string(),
    video: v.string(),
    category: v.string(),
    instructor: v.string(), //userId
    skills: v.string(),
    status: v.string(), //published or draft    
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("courses", 
        { 
            title: args.title, 
            intro: args.intro, 
            description: args.description, 
            image: args.image, 
            video: args.video, 
            category: args.category, 
            instructor: args.instructor, 
            skills: args.skills, 
            status: args.status, 
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("courses")        
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTasksByUser = query({
    args: {
        instructor: v.string(),
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("courses")        
        .withIndex("by_instructor",(q) => q.eq("instructor",args.instructor))
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTaskById = query({
    args: { courseId: v.id("courses") },
    handler: async (ctx, args) => {
      const task = await ctx.db.get(args.courseId);
      return task
    },
});

export const updateTask = mutation({
    args: {
        id:v.id('courses'),
        title: v.string(),
        intro: v.string(),
        description: v.string(),
        image: v.string(),
        video: v.string(),
        category: v.string(),
        instructor: v.string(), //userId
        skills: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            title: args.title, 
            intro: args.intro, 
            description: args.description, 
            image: args.image, 
            video: args.video, 
            category: args.category, 
            instructor: args.instructor, 
            skills: args.skills, 
            status: args.status, 
        });
      
    },
});

export const updateTaskStatus = mutation({
    args: {
        id:v.id('courses'),        
        status: v.string(),
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        {             
            status: args.status, 
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("courses") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});