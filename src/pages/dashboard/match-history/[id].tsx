/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { use, useEffect, useState } from "react";
import Head from "next/head";
import MatchOverview from "../../../components/match-detetails/MatchOverview";
import TeamComposition from "../../../components/match-detetails/TeamComposition";
import GoldXpGraph from "../../../components/match-detetails/GoldXpGraph";
import TeamfightTimeline from "../../../components/match-detetails/TeamfightTimeline";
import ObjectivesTimeline from "../../../components/match-detetails/ObjectivesTimeline";
import DraftPhase from "../../../components/match-detetails/DraftPhase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import { api } from "~/utils/api";
import type { Log, MatchDetails } from "~/types";

export default function Home() {
  const [matchData, setMatchData] = useState<MatchDetails | null>(null);
  const [fullLogs, setFullLogs] = useState<Log[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getMatches = api.dota.getMatchFullDetails.useMutation();

  useEffect(() => {
    const matchId = window.location.pathname.split("/").pop();  
    if (matchId) {
      getMatches.mutate({ matchId:8270889523 }, {
        onSuccess: (data) => {
          setMatchData(data?.dataMatch ? data?.dataMatch : null);
          setFullLogs(data?.logs ? data?.logs : null);
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
        <span className="ml-2 text-lg">Loading match data...</span>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Failed to load match data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dota 2 Match Analysis | {matchData?.match_id}</title>
        <meta name="description" content="Detailed analysis of Dota 2 match" />
      </Head>

      <main className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Match {matchData?.match_id} Analysis
        </h1>

        <MatchOverview matchData={matchData} />

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="graphs">Graphs</TabsTrigger>
            <TabsTrigger value="teamfights">Teamfights</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <TeamComposition matchData={matchData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="draft">
            <Card>
              <CardContent className="pt-6">
                <DraftPhase {...matchData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graphs">
            <Card>
              <CardContent className="pt-6">
                <GoldXpGraph 
                  {...matchData} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teamfights">
            <Card>
              <CardContent className="pt-6">
                <TeamfightTimeline {...matchData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="objectives">
            <Card>
              <CardContent className="pt-6">
                <ObjectivesTimeline fullLogs={fullLogs} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
