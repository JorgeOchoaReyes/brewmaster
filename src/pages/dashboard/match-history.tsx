import { Loader2 } from "lucide-react";
import React from "react";  
import { MatchDataTable } from "~/components/table/match-history";
import { api } from "~/utils/api";

export default function MatchHistory() {  

  const matchHistory = api.dota.getMatchHistory.useQuery(); 

  return ( 
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Match History</h1> 
      {
        matchHistory.isLoading ? <Loader2 className="animate-spin" size={24} /> : <MatchDataTable matchesData={matchHistory.data ?? []} />
      }
    </div> 
  );
}