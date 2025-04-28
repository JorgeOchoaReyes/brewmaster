import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";
import Image from "next/image";
import type { MatchDetails } from "~/types"; 

export default function DraftPhase({ picks_bans }: MatchDetails) { 
  const picksBans = Array.isArray(picks_bans) ? picks_bans : [];
  const sortedPicksBans = [...picksBans].sort((a, b) => a.order - b.order);

  return (
    <div>
      <CardHeader className="pb-2">
        <CardTitle>Draft Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-700">Radiant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Picks</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {sortedPicksBans
                      .filter((pb) => pb.is_pick && pb.team === 0)
                      .map((pb, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md">
                            <Image
                              src={ "/placeholder.svg"}
                              alt={pb.hero_id.toString()}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs mt-1 text-center truncate w-full">{(pb.hero_id)}</span>
                          <Badge variant="outline" className="mt-1 text-xs">
                            Pick {Math.floor(index / 2) + 1}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Bans</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {sortedPicksBans
                      .filter((pb) => !pb.is_pick && pb.team === 0)
                      .map((pb, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md opacity-60">
                            <div className="absolute inset-0 bg-red-500 bg-opacity-30 z-10 flex items-center justify-center">
                              <X className="text-red-600 w-6 h-6" />
                            </div>
                            <Image
                              src={"/placeholder.svg"}
                              alt={(pb.hero_id).toString()}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs mt-1 text-center truncate w-full">{(pb.hero_id)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-700">Dire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Picks</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {sortedPicksBans
                      .filter((pb) => pb.is_pick && pb.team === 1)
                      .map((pb, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md">
                            <Image
                              src={"/placeholder.svg"}
                              alt={(pb.hero_id).toString()}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs mt-1 text-center truncate w-full">{(pb.hero_id)}</span>
                          <Badge variant="outline" className="mt-1 text-xs">
                            Pick {Math.floor(index / 2) + 1}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Bans</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {sortedPicksBans
                      .filter((pb) => !pb.is_pick && pb.team === 1)
                      .map((pb, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md opacity-60">
                            <div className="absolute inset-0 bg-red-500 bg-opacity-30 z-10 flex items-center justify-center">
                              <X className="text-red-600 w-6 h-6" />
                            </div>
                            <Image
                              src={"/placeholder.svg"}
                              alt={(pb.hero_id).toString()}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs mt-1 text-center truncate w-full">{(pb.hero_id)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </div>
  );
}
