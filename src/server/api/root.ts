import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { stripeRouter } from "./routers/stripe"; 
import { dotaRouter } from "./routers/dota";

export const appRouter = createTRPCRouter({
  user: userRouter,
  stripe: stripeRouter,
  dota: dotaRouter
});
 
export type AppRouter = typeof appRouter; 
export const createCaller = createCallerFactory(appRouter);
