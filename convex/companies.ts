import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    name: v.string(),
    website: v.string(), //full-time ...
    logo: v.string(),
    status: v.string(), //open    
    description: v.string(), //open 
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("companies", 
        { 
            name: args.name,             
            website: args.website,             
            logo: args.logo,             
            status: args.status,             
            description: args.description,             
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("companies")        
        .order("desc")
        .collect();

        return tasks;
    },
});

export const getTasksById = query({
    args: {companyId:v.id("companies")},
    handler: async (ctx, args) => {
        const tasks = await ctx.db.get(args.companyId)        

        return tasks;
    },
});

export const updateTask = mutation({
    args: {
        id:v.id('companies'),
        name: v.string(),
        website: v.string(), //full-time ...
        logo: v.string(),
        status: v.string(), //open    
        description: v.string(), //open 
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            name: args.name,             
            website: args.website,             
            logo: args.logo,             
            status: args.status,             
            description: args.description,             
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("companies") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});



