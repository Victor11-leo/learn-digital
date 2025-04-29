import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    question: v.string(),    
    answers: v.array(v.object({
        option:v.string(),
        correct:v.boolean(),
    })),        
    quizId:v.optional(v.id("quizes"))
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("questions", 
        { 
            question: args.question,             
            answers: args.answers,             
            quizId: args.quizId,             
            
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("questions")        
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTasksByQuiz = query({
    args: {
        quizId:v.optional(v.id("quizes"))
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("questions")   
        .withIndex("by_quizId",(q) => q.eq("quizId",args.quizId))            
        .order("desc")
        .collect();

        return tasks;
    },
});


export const updateTask = mutation({
    args: {
        id:v.id('questions'),
        question: v.string(),    
        answers: v.array(v.object({
            option:v.string(),
            correct:v.boolean(),
        })),        
        quizId:v.optional(v.id("quizes"))
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            question: args.question,             
            answers: args.answers,             
            quizId: args.quizId,             
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("questions") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});