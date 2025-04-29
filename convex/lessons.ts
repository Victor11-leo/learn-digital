import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    title: v.string(),    
    video: v.string(),    
    instructorNotes: v.string(),    
    content: v.string(),    
    chapterId: v.optional(v.id("courses")),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("lessons", 
        { 
            title: args.title, 
            video: args.video, 
            instructorNotes: args.instructorNotes, 
            content: args.content, 
            chapterId: args.chapterId, 
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("lessons")        
        .order("desc")
        .collect();

        
        return Promise.all(
          tasks.map(async (booking) => {
            const course = await ctx.db.get(booking.chapterId);
            return {
              ...booking,
              course
            };
          })
        );
    },
});

export const getTasksById = query({
    args: {lessonId:v.id("lessons")},
    handler: async (ctx, args) => {
      const tasks = await ctx.db.get(args.lessonId)      
      return tasks

    },

});

export const getTasksByChapter = query({
    args: {chapterId:v.id("courses")},
    handler: async (ctx, args) => {
      const tasks = await ctx.db
      .query("lessons")        
      .withIndex("by_chapterId",(q) => q.eq("chapterId",args.chapterId))
      .order("desc")
      .collect();

      return Promise.all(
        tasks.map(async (booking) => {
          const course = await ctx.db.get(booking.chapterId);
          return {
            ...booking,
            course
          };
        })
      );
    },
});


export const updateTask = mutation({
    args: {
        id:v.id('lessons'),
        title: v.string(),    
        video: v.string(),    
        instructorNotes: v.string(),    
        content: v.string(),    
        chapterId: v.optional(v.id("courses")),   
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            title: args.title, 
            video: args.video, 
            instructorNotes: args.instructorNotes, 
            content: args.content, 
            chapterId: args.chapterId,            
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("lessons") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});