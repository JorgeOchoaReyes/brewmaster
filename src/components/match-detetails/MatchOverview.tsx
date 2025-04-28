/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Trophy, Clock, Calendar } from "lucide-react";
import { formatDate, formatDuration } from "./formatters";

interface MatchOverviewProps {
  matchData: any
}

export default function MatchOverview({ matchData }: MatchOverviewProps) {
  const { match_id, start_time, duration, radiant_win, radiant_score, dire_score, game_mode, lobby_type } = matchData;

  const getGameMode = (mode: number) => {
    const modes: Record<number, string> = {
      1: "All Pick",
      2: "Captains Mode",
      3: "Random Draft",
      4: "Single Draft",
      5: "All Random",
      22: "Ranked All Pick",
    };
    return modes[mode] ?? `Mode ${mode}`;
  };

  const getLobbyType = (type: number) => {
    const types: Record<number, string> = {
      0: "Normal",
      1: "Practice",
      2: "Tournament",
      3: "Tutorial",
      4: "Co-op with Bots",
      5: "Ranked Team MM",
      6: "Ranked Solo MM",
      7: "Ranked",
    };
    return types[type] ?? `Lobby ${type}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(start_time)}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatDuration(duration)}
            </div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline">{getGameMode(game_mode)}</Badge>
              <Badge variant="outline">{getLobbyType(lobby_type)}</Badge>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold flex items-center space-x-2">
              <span className="text-green-600">{radiant_score}</span>
              <span>-</span>
              <span className="text-red-600">{dire_score}</span>
            </div>
            <div className="mt-2 flex items-center">
              <Trophy className="w-5 h-5 mr-1 text-yellow-500" />
              <span className={radiant_win ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {radiant_win ? "Radiant Victory" : "Dire Victory"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <div className="text-sm text-gray-500">Match ID</div>
            <div className="font-mono">{match_id}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
