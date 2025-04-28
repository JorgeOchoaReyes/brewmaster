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
  