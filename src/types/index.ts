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
  player_slot: number
  account_id: number
  kills: number
  deaths: number
  assists: number
  leaver_status: number
  gold: number
  last_hits: number
  denies: number
  gold_per_min: number
  xp_per_min: number
  gold_spent: number
  hero_damage: number
  tower_damage: number
  hero_healing: number
  level: number
  item_0_name: string
  item_1_name: string
  item_2_name: string
  item_3_name: string
  item_4_name: string
  item_5_name: string
  item_neutral_name: string
  backpack_0_name: any
  backpack_1_name: any
  backpack_2_name: any
  hero_id: number
  item_0: number
  item_1: number
  item_2: number
  item_3: number
  item_4: number
  item_5: number
  additional_units: any
  stuns: number
  max_hero_hit: any
  times: number[]
  gold_t: number[]
  lh_t: number[]
  xp_t: number[]
  obs_log: any[]
  sen_log: any[]
  purchase_log: any[]
  kills_log: any[]
  buyback_log: any[]
  lane_pos: any
  obs: any
  sen: any
  actions: any
  pings: any
  purchase: any
  gold_reasons: any
  xp_reasons: any
  killed: any
  item_uses: any
  ability_uses: any
  hero_hits: any
  damage: any
  damage_taken: any
  damage_inflictor: any
  runes: any
  killed_by: any
  kill_streaks: any
  multi_kills: any
  life_state: any
  damage_inflictor_received: any
  obs_placed: number
  sen_placed: number
  creeps_stacked: number
  camps_stacked: number
  rune_pickups: number
  obs_left_log: any[]
  sen_left_log: any[]
  ability_upgrades_arr: number[]
  party_id: any
  permanent_buffs: any
  backpack_0: number
  backpack_1: number
  backpack_2: number
  runes_log: any[]
  lane: number
  lane_role: number
  is_roaming: boolean
  firstblood_claimed: number
  teamfight_participation: number
  towers_killed: number
  roshans_killed: number
  observers_placed: number
  party_size: any
  ability_targets: any
  damage_targets: any
  dn_t: number[]
  connection_log: any[]
  backpack_3: any
  item_neutral: number
  net_worth: number
  hero_variant: number
  neutral_tokens_log: any[]
  neutral_item_history: any[]
}