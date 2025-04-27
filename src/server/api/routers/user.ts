import { read } from "fs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  saveSteamAccountId: protectedProcedure
    .input(z.object({ streamAccountId: z.string() }))
    .mutation(async ({ input, ctx}) => {  
      const { streamAccountId } = input;
      const user = ctx.session.user;
      if (!user) {
        throw new Error("User not found");
      }
      const userId = user.uid;
      const db =  ctx.db; 

      await db.collection("users").doc(userId).set({
        steamAccountId: streamAccountId,
      }, { merge: true });

      return streamAccountId;
    }),
  readSteamAccountId: protectedProcedure
    .query(async ({ ctx}) => {
      const user = ctx.session.user;
      if (!user) {
        throw new Error("User not found");
      }
      const userId = user.uid;
      const db =  ctx.db; 

      const doc = await db.collection("users").doc(userId).get();
      if (!doc.exists) {
        throw new Error("User not found in database");
      }
      const steamAccountid = doc.data() as { steamAccountId: string };

      return steamAccountid.steamAccountId ?? "";
    }),
});