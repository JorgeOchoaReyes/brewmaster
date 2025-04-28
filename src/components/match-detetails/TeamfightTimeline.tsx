import { formatDuration } from "./formatters";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skull, Users } from "lucide-react";
import type { MatchDetails } from "~/types"; 

export default function TeamfightTimeline({ teamfights }: MatchDetails) { 

  return (
    <div>
      <CardHeader className="pb-2">
        <CardTitle>Teamfights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamfights.map((teamfight, index) => { 
            const radiantKills = teamfight.players 
              .reduce((acc: number, p) => acc + Object.keys(p.killed || {}).length, 0);

            const direKills = teamfight.players 
              .reduce((acc: number, p) => acc + Object.keys(p.killed || {}).length, 0);

            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-medium">Teamfight #{index + 1}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDuration(teamfight.start)} - {formatDuration(teamfight.end)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Radiant Kills</div>
                      <div className="text-xl font-bold text-green-600">{radiantKills}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Dire Kills</div>
                      <div className="text-xl font-bold text-red-600">{direKills}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-green-700">Radiant Deaths</h4>
                      <div className="space-y-2">
                        {teamfight.players 
                          .map((player, playerIndex: number) => (
                            <div key={playerIndex} className="flex items-center text-sm">
                              <Skull className="w-3 h-3 mr-1 text-gray-500" />
                              <span>Player {player.killed ? "true" : "false"} died</span>
                            </div>
                          ))}
                        {teamfight.players.length === 0 && (
                          <div className="text-sm text-gray-500">No deaths</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 text-red-700">Dire Deaths</h4>
                      <div className="space-y-2">
                        {teamfight.players 
                          .map((player, playerIndex: number) => (
                            <div key={playerIndex} className="flex items-center text-sm">
                              <Skull className="w-3 h-3 mr-1 text-gray-500" />
                              <span>Player {player.killed ? "true" : "false"} died</span>
                            </div>
                          ))}
                        {teamfight.players.length === 0 && (
                          <div className="text-sm text-gray-500">No deaths</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </div>
  );
}
