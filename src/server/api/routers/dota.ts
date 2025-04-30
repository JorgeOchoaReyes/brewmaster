import { type BuybackLog, type Log } from "./../../../types/index";
import { type DotaMatchHistory, type DotaPlayerAccount, type KillsLog, type MatchDetails, type Objec, type PlayerMatchContributions, type PurchaseLog } from "../../../types/index";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dotaRouter = createTRPCRouter({
  getMatchHistory: protectedProcedure 
    .query(async ({ctx}) => {  
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
      const apiUrl = process.env.DOTA_API_URL + `/players/${accountId}/matches?limit=15`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch match history");
      }
      const data = await response.json() as DotaMatchHistory[];
      return data;
 
    }),
  getPlayerProfile: protectedProcedure
    .query(async ({ ctx }) => {
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
      const response = await fetch(apiUrl); 
      if (!response.ok) {
        throw new Error("Failed to fetch player profile");
      }
      const data = await response.json() as DotaPlayerAccount;
      return data;
    }),

  getMatchFullDetails: protectedProcedure
    .input(z.object({ matchId: z.number() }))
    .mutation(async ({ input, ctx}) => {  
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
 
      const queryAMatch = encodeURIComponent(`SELECT 
        match_id, 
        start_time,
        duration,
        radiant_win, 
        radiant_score, 
        dire_score, 
        game_mode,
        lobby_type, 
        picks_bans, 
        radiant_gold_adv, 
        radiant_xp_adv, 
        duration, 
        teamfights, 
        objectives
        FROM matches WHERE match_id = ${input.matchId};`); 
      const queryPlayerDetails = encodeURIComponent(`
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
          pm.purchase_log, 
          pm.kills_log, 
          pm.buyback_log
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
          m.match_id = ${input.matchId};
      `);

      const apiQueryMatch = process.env.DOTA_API_URL + `/explorer?sql=${queryAMatch}`;
      const apiQueryPlayerDetails = process.env.DOTA_API_URL + `/explorer?sql=${queryPlayerDetails}`;

      try {
        const responseMatch = await fetch(apiQueryMatch);
        const responsePlayerDetails = await fetch(apiQueryPlayerDetails); 

        const dataMatch = ((await responseMatch.json()) as {rows: MatchDetails[]}).rows[0]; 
        const dataPlayerDetails = (await responsePlayerDetails.json() as {rows: PlayerMatchContributions[]}).rows; 

        let fullLogsOfMatch = (dataMatch?.objectives ?? []) as (Log)[];

        if(dataPlayerDetails.length > 0) { 
          dataPlayerDetails.forEach((p) => {
            const logs = [
              p.buyback_log.map((log) => ({ ...log, type: "buyback_log", player_name: p.player_name, hero_name: p.hero_played })),
              p.kills_log.map((log) => ({ ...log, type: "kills_log", player_name: p.player_name, hero_name: p.hero_played })),
              p.purchase_log.map((log) => ({ ...log, type: "purchase_log", player_name: p.player_name, hero_name: p.hero_played })),
            ].flat(); 
            fullLogsOfMatch.push(...logs); ;
          });
        }         

        fullLogsOfMatch = fullLogsOfMatch.filter((log) => log !== null && log !== undefined);
        fullLogsOfMatch.sort((a, b) => (a.time) - (b.time));

        return { dataMatch, dataPlayerDetails, logs: fullLogsOfMatch };
      } catch (error) {
        console.error("Error fetching match details:", error);
        return null;
      }

    }),
});

