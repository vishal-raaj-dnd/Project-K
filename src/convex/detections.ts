import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const logDetection = mutation({
  args: {
    timestamp: v.string(),
    detectionType: v.string(),
    confidence: v.number(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("detections", {
      timestamp: args.timestamp,
      detectionType: args.detectionType,
      confidence: args.confidence,
      location: args.location,
    });
  },
});

export const getRecentDetections = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("detections")
      .order("desc")
      .take(limit);
  },
});
