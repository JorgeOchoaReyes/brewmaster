import type { MatchHistoryRef } from "~/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { format } from "date-fns";
import { useRouter } from "next/router";
 
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
 
const didPlayerWin = (playerSlot: number, radiantWin: boolean): boolean => {
  const isRadiant = playerSlot < 128;
  return (isRadiant && radiantWin) || (!isRadiant && !radiantWin);
};

export const MatchDataTable = ({matchesData}: {matchesData: MatchHistoryRef[]}) => {
  const router = useRouter();
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Match ID</TableHead>
            <TableHead>Hero</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>K/D/A</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Game Mode</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Party Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchesData.map((match) => { 
            const matchDate = new Date(match.start_time * 1000);
            const formattedDate = format(matchDate, "MMM d, yyyy h:mm a");
 
            const playerWon = didPlayerWin(match.player_slot, match.radiant_win);

            return (
              <TableRow key={match.match_id} className="cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={async (e) => {
                await router.push(`/dashboard/match-history/${match.match_id}`);
              }}>
                <TableCell>{match.match_id}</TableCell>
                <TableCell>{match.hero_id}</TableCell>
                <TableCell>
                  <span className={playerWon ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {playerWon ? "Win" : "Loss"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-green-600">{match.kills}</span> /
                  <span className="text-red-600">{match.deaths}</span> /
                  <span className="text-blue-600">{match.assists}</span>
                </TableCell>
                <TableCell>{formatDuration(match.duration)}</TableCell>
                <TableCell>{match.game_mode || `Unknown (${match.game_mode})`}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{match.party_size ?? "Solo"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
