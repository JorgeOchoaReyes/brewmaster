import { type DotaMatchHistory } from "./../../../pages/types/index";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dotaRouter = createTRPCRouter({
  getMatchHistory: protectedProcedure 
    .query(async ({ input, ctx}) => {  
      const user = ctx.session.user;
      const db = ctx.db;
      if (!user) {
        throw new Error("User not found");
      }
      const userId = user.uid;
      const getAccountId  = await db.collection("users").doc(userId).get();
      if (!getAccountId.exists) {
        throw new Error("User not found in database");
      }
      const steamAccountId = getAccountId.data() as { steamAccountId: string };
      const accountId = steamAccountId.steamAccountId;
      if (!accountId) {
        throw new Error("Account ID not found in database");
      }
      const apiUrl = process.env.DOTA_API_URL + `/players/${accountId}`;

      const queryAMatch = "SELECT * FROM matches WHERE match_id = [your_match_id_here]"; 
      const queryPlayerDetails = `
        SELECT
          pm.match_id,
          m.match_seq_num,
          m.radiant_win,
          m.start_time,
          m.duration,
          l.name AS league_name,
          rt.name AS radiant_team_name,
          dt.name AS dire_team_name,
          pl.personaname AS player_name,
          h.localized_name AS hero_played, 
          i0.localized_name AS item_0_name,
          i1.localized_name AS item_1_name,
          i2.localized_name AS item_2_name,
          i3.localized_name AS item_3_name,
          i4.localized_name AS item_4_name,
          i5.localized_name AS item_5_name,
          ineutral.localized_name AS item_neutral_name,
          bp0.localized_name AS backpack_0_name,
          bp1.localized_name AS backpack_1_name,
          bp2.localized_name AS backpack_2_name,
          pm.*
        FROM player_matches pm
        JOIN matches m ON pm.match_id = m.match_id  
        JOIN players pl ON pm.account_id = pl.account_id
        JOIN heroes h ON pm.hero_id = h.id
        LEFT JOIN items i0 ON pm.item_0 = i0.id
        LEFT JOIN items i1 ON pm.item_1 = i1.id
        LEFT JOIN items i2 ON pm.item_2 = i2.id
        LEFT JOIN items i3 ON pm.item_3 = i3.id
        LEFT JOIN items i4 ON pm.item_4 = i4.id
        LEFT JOIN items i5 ON pm.item_5 = i5.id
        LEFT JOIN items ineutral ON pm.item_neutral = ineutral.id
        LEFT JOIN items bp0 ON pm.backpack_0 = bp0.id
        LEFT JOIN items bp1 ON pm.backpack_1 = bp1.id
        LEFT JOIN items bp2 ON pm.backpack_2 = bp2.id
        LEFT JOIN leagues l ON m.leagueid = l.leagueid
        LEFT JOIN teams rt ON m.radiant_team_id = rt.team_id
        LEFT JOIN teams dt ON m.dire_team_id = dt.team_id
        WHERE
          m.match_id = 8270889523;
      `;

    })
});
