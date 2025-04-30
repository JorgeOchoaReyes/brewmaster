/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UserDetails {
    steamAccountId: string;
};

export interface DotaMatchHistory {
    match_id: number
    player_slot: number
    radiant_win: boolean
    duration: number
    game_mode: number
    lobby_type: number
    hero_id: number
    start_time: number
    version: number
    kills: number
    deaths: number
    assists: number
    skill: number
    average_rank: number
    leaver_status: number
    party_size: number
    hero_variant: number
}  

export interface DotaPlayerAccount {
    profile: Profile
    rank_tier: any
    leaderboard_rank: any
  }
  
export interface Profile {
    account_id: number
    personaname: string
    name: any
    plus: boolean
    cheese: number
    steamid: string
    avatar: string
    avatarmedium: string
    avatarfull: string
    profileurl: string
    last_login: string
    loccountrycode: any
    status: any
    fh_unavailable: boolean
    is_contributor: boolean
    is_subscriber: boolean
  }
  
export interface MatchHistoryRef {
    match_id: number
    player_slot: number
    radiant_win: boolean
    duration: number
    game_mode: number
    lobby_type: number
    hero_id: number
    start_time: number
    version: any
    kills: number
    deaths: number
    assists: number
    average_rank: number
    leaver_status: number
    party_size: any
    hero_variant: number
  }
  

export interface MatchDetails {
    match_id: number
    start_time: number
    duration: number
    radiant_win: boolean
    radiant_score: number
    dire_score: number
    game_mode: number
    lobby_type: number
    picks_bans: PicksBan[]
    radiant_gold_adv: number[]
    radiant_xp_adv: number[]
    teamfights: Teamfight[]
    objectives: Objec[]
  }
  
export interface PicksBan {
    is_pick: boolean
    hero_id: number
    team: number
    order: number
  }
  
export interface Teamfight {
    start: number
    end: number
    last_death: number
    deaths: number
    players: Player[]
  }
  
export interface Player {
    deaths_pos: Record<number, Record<number, number>>
    ability_uses: Record<string, number> 
    item_uses: Record<string, number> 
    killed: Record<string, number> 
    deaths: number
    buybacks: number
    damage: number
    healing: number
    gold_delta: number
    xp_delta: number
    xp_start: number
    xp_end: number
  } 
  
export interface Objec {
    time: number
    type: string
    value?: number
    killer?: number
    team?: number
    slot?: number
    key: any
    player_slot?: number
    unit?: string
  }

export interface PlayerMatchContributions {
  match_id: number
  match_seq_num: number
  radiant_win: boolean
  start_time: number
  duration: number
  league_name: string
  radiant_team_name: string
  dire_team_name: string
  player_name: string
  hero_played: string
  purchase_log: PurchaseLog[]
  kills_log: KillsLog[]
  buyback_log: BuybackLog[]
}

export interface PurchaseLog {
  time: number
  key: string
}

export interface KillsLog {
  time: number
  key: string
}

export interface BuybackLog {
  time: number
  slot: number
  type: string
  player_slot: number
}

export interface Log {
  time: number
  key?: any
  type?: string 
  slot?: number
  value?: number
  killer?: number
  team?: number 
  player_slot?: number
  unit?: string
  player_name?: string
  hero_name?: string
}