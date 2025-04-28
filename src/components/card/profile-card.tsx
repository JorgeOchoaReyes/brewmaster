import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { type DotaPlayerAccount } from "~/types";
 

export const SteamProfileCard = ({ data }: { data: DotaPlayerAccount | null }) => { 
  if (!data) return null; // Handle the case when data is null
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="bg-slate-50 pb-0">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage
              src={data.profile.avatarfull || "/placeholder.svg"}
              alt={`${data.profile.personaname}'s avatar`}
            />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{data.profile.personaname}</h2>
            <p className="text-sm text-muted-foreground">Steam ID: {data.profile.steamid}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.profile.is_contributor && <Badge variant="secondary">Contributor</Badge>}
            {data.profile.is_subscriber && <Badge variant="secondary">Subscriber</Badge>}
            {data.profile.plus && <Badge variant="secondary">Plus</Badge>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Login</span>
              <span>{data.profile.last_login ? formatDate(data.profile.last_login) : "N/A"}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Account ID</span>
              <span>{data.profile.account_id}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Country</span>
              <span>{data.profile.loccountrycode ?? "Not specified"}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rank</span>
              <span>{data.rank_tier ?? "Unranked"}</span>
            </div>
          </div>

          <Link
            href={data.profile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Steam Profile
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
