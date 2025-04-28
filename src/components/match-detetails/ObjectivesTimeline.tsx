import { formatDuration } from "./formatters";
import { CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Building, Flag, Truck } from "lucide-react";
import type { MatchDetails } from "~/types";
 
export default function ObjectivesTimeline({ objectives }: MatchDetails) { 
  const getObjectiveTypeName = (type: string) => {
    const types: Record<string, string> = {
      CHAT_MESSAGE_COURIER_LOST: "Courier Killed",
      CHAT_MESSAGE_FIRSTBLOOD: "First Blood",
      CHAT_MESSAGE_AEGIS: "Aegis Picked Up",
      CHAT_MESSAGE_ROSHAN_KILL: "Roshan Killed",
      building_kill: "Building Destroyed",
    };
    return types[type] ?? type;
  };
 
  const getBuildingName = (key: string) => {
    if (!key) return "Unknown Building";

    const buildings: Record<string, string> = {
      npc_dota_goodguys_tower1_bot: "Radiant Bottom T1",
      npc_dota_goodguys_tower1_mid: "Radiant Mid T1",
      npc_dota_goodguys_tower1_top: "Radiant Top T1",
      npc_dota_goodguys_tower2_bot: "Radiant Bottom T2",
      npc_dota_goodguys_tower2_mid: "Radiant Mid T2",
      npc_dota_goodguys_tower2_top: "Radiant Top T2",
      npc_dota_goodguys_tower3_bot: "Radiant Bottom T3",
      npc_dota_goodguys_tower3_mid: "Radiant Mid T3",
      npc_dota_goodguys_tower3_top: "Radiant Top T3",
      npc_dota_goodguys_melee_rax_bot: "Radiant Bottom Melee Barracks",
      npc_dota_goodguys_range_rax_bot: "Radiant Bottom Ranged Barracks",
      npc_dota_goodguys_melee_rax_mid: "Radiant Mid Melee Barracks",
      npc_dota_goodguys_range_rax_mid: "Radiant Mid Ranged Barracks",
      npc_dota_goodguys_melee_rax_top: "Radiant Top Melee Barracks",
      npc_dota_goodguys_range_rax_top: "Radiant Top Ranged Barracks",
      npc_dota_goodguys_fort: "Radiant Ancient",
      npc_dota_badguys_tower1_bot: "Dire Bottom T1",
      npc_dota_badguys_tower1_mid: "Dire Mid T1",
      npc_dota_badguys_tower1_top: "Dire Top T1",
      npc_dota_badguys_tower2_bot: "Dire Bottom T2",
      npc_dota_badguys_tower2_mid: "Dire Mid T2",
      npc_dota_badguys_tower2_top: "Dire Top T2",
      npc_dota_badguys_tower3_bot: "Dire Bottom T3",
      npc_dota_badguys_tower3_mid: "Dire Mid T3",
      npc_dota_badguys_tower3_top: "Dire Top T3",
      npc_dota_badguys_melee_rax_bot: "Dire Bottom Melee Barracks",
      npc_dota_badguys_range_rax_bot: "Dire Bottom Ranged Barracks",
      npc_dota_badguys_melee_rax_mid: "Dire Mid Melee Barracks",
      npc_dota_badguys_range_rax_mid: "Dire Mid Ranged Barracks",
      npc_dota_badguys_melee_rax_top: "Dire Top Melee Barracks",
      npc_dota_badguys_range_rax_top: "Dire Top Ranged Barracks",
      npc_dota_badguys_fort: "Dire Ancient",
    };

    return buildings[key] ?? key;
  };
 
  const getObjectiveIcon = (type: string) => {
    switch (type) {
    case "CHAT_MESSAGE_COURIER_LOST":
      return <Truck className="w-4 h-4" />;
    case "building_kill":
      return <Building className="w-4 h-4" />;
    case "CHAT_MESSAGE_ROSHAN_KILL":
    case "CHAT_MESSAGE_AEGIS":
      return <Flag className="w-4 h-4" />;
    default:
      return <Flag className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <CardHeader className="pb-2">
        <CardTitle>Objectives Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-4 ml-8">
            {objectives.map((objective, index) => (
              <div key={index} className="relative pb-4">
                <div className="absolute -left-8 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                  {getObjectiveIcon(objective.type)}
                </div>
                <div className="text-sm text-gray-500 mb-1">{formatDuration(objective.time)}</div>
                <div className="font-medium">{getObjectiveTypeName(objective.type)}</div>
                {objective.type === "building_kill" && (
                  <div className="text-sm text-gray-600">{getBuildingName(objective?.key as string)}</div>
                )}
                {objective.type === "CHAT_MESSAGE_COURIER_LOST" && (
                  <div className="text-sm text-gray-600">
                    {objective.team === 2 ? "Radiant" : "Dire"} courier killed
                  </div>
                )}
                {objective.type === "CHAT_MESSAGE_ROSHAN_KILL" && (
                  <div className="text-sm text-gray-600">
                    Roshan killed by {objective.team === 2 ? "Radiant" : "Dire"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
