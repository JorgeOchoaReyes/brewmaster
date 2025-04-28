import React, { useEffect } from "react";  
import { SteamProfileCard } from "~/components/card/profile-card";
import { api } from "~/utils/api";
import { type DotaPlayerAccount } from "../../types";
import { Loader2 } from "lucide-react";

export default function Dashboard() {   
  const [profile, setProfile] = React.useState<DotaPlayerAccount | null>(null);
  const dotaProfile = api.dota.getPlayerProfile.useQuery(); 
  useEffect(() => {
    if (dotaProfile.data) {
      setProfile(dotaProfile.data);
    }
  }, [dotaProfile.data]);
  return ( 
    <div className="flex flex-col p-10">
      {
        dotaProfile.isPending ? (
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : (
          <>
            <SteamProfileCard data={profile} />
          </>
        )}
    </div> 
  );
}