import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: {
    title: v.string(),
    category: v.string(), //should match 
    skills: v.string(), //should match 
    type: v.string(), //full-time ...
    location: v.string(),
    status: v.string(), //open    
    description: v.string(), //open 
    companyId:v.optional(v.id('companies')),       
    employer:v.string(),  
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("jobs", 
        { 
            title: args.title, 
            category: args.category, 
            skills: args.skills, 
            type: args.type, 
            location: args.location, 
            status: args.status, 
            description: args.description, 
            companyId: args.companyId, 
            employer: args.employer, 
            
        });
    return newTaskId;
  },
});

export const getTasks = query({
    args: {},
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("jobs")        
        .order("desc")
        .collect();

        // return tasks;
        return Promise.all(
            tasks.map(async (booking) => {
                
              const company = booking.companyId == undefined ? undefined : await ctx.db.get(booking?.companyId);
              return {
                ...booking,
                company
              };
            })
          );
    },
});

export const getTasksByUser = query({
    args: {
        employer: v.string(),
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
        .query("jobs")        
        .withIndex("by_employer",(q) => q.eq("employer",args.employer))
        .order("desc")
        .collect();

        return Promise.all(
          tasks.map(async (booking) => {
              
            const company = booking.companyId == undefined ? undefined : await ctx.db.get(booking?.companyId);
            return {
              ...booking,
              company
            };
          })
        );
    },
});

export const getTaskById = query({
    args: { jobId: v.id("jobs") },
    handler: async (ctx, args) => {
      const task = await ctx.db.get(args.jobId);
      return task
    },
});

export const updateTask = mutation({
    args: {
        id:v.id('jobs'),
        title: v.string(),
        category: v.string(), //should match 
        skills: v.string(), //should match 
        type: v.string(), //full-time ...
        location: v.string(),
        status: v.string(), //open    
        description: v.string(), //open 
        companyId:v.optional(v.id('companies')),       
        employer:v.string(), 
    },
    handler: async (ctx, args) => {
      const { id } = args;
      
      await ctx.db.patch(id, 
        { 
            title: args.title, 
            category: args.category, 
            skills: args.skills, 
            type: args.type, 
            location: args.location, 
            status: args.status, 
            description: args.description, 
            companyId: args.companyId, 
            employer: args.employer, 
        });
      
    },
});

export const deleteTask = mutation({
    args: { id: v.id("jobs") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});