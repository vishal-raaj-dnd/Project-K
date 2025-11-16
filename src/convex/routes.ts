import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveRoute = mutation({
  args: {
    userId: v.optional(v.id("users")),
    destination: v.string(),
    routes: v.array(v.any()),
    selectedRoute: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("routes", {
      userId: args.userId,
      destination: args.destination,
      routes: args.routes,
      selectedRoute: args.selectedRoute,
    });
  },
});

export const getUserRoutes = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    return await ctx.db
      .query("routes")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(10);
  },
});
