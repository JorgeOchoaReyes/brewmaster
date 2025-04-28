
import type { MatchDetails } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import Image from "next/image";
 
export default function TeamComposition({ matchData }: { matchData: MatchDetails }) { 
 
  const picksBans = Array.isArray(matchData.picks_bans) ? matchData.picks_bans : [];
 
  const radiantHeroes = picksBans.filter((pb) => pb.is_pick && pb.team === 0).map((pb) => pb.hero_id);

  const direHeroes = picksBans.filter((pb) => pb.is_pick && pb.team === 1).map((pb) => pb.hero_id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-700">Radiant Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {radiantHeroes?.map((heroId: number, index: number) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md">
                        <Image
                          src={"/placeholder.svg"}
                          alt={(heroId).toString()}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs mt-1 text-center truncate w-full">{(heroId)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{(heroId)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-700">Dire Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {direHeroes.map((heroId: number, index: number) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-9 md:w-20 md:h-11 overflow-hidden rounded-md">
                        <Image
                          src={"/placeholder.svg"}
                          alt={(heroId).toString()}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs mt-1 text-center truncate w-full">{(heroId)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{(heroId)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
