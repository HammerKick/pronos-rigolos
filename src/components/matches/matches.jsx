import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL, API_KEY } from "../../config";
import { MatchTeam } from "./match-team";
import { MatchesCard } from "./matches-card";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [upComingMatches, setUpComingMatches] = useState([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await fetch(`${API_URL}competitions/WC/matches`, {
          method: "GET",
          headers: {
            "X-Auth-Token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        const matchesResults = result.matches.filter((match) => {
          return match.status !== "TIMED";
        });
        const upcomingMatches = result.matches.filter(
          (match) => match.status === "TIMED",
        );
        const sortedMatchesWithResults = [...matchesResults].sort(
          (a, b) => new Date(b.utcDate) - new Date(a.utcDate),
        );
        const sortedUpcomingMatches = [...upcomingMatches].sort(
          (a, b) => new Date(a.utcDate) - new Date(b.utcDate),
        );
        const groupedMatchesWithResults = sortedMatchesWithResults.reduce(
          (acc, match) => {
            if (!acc[match.stage]) {
              acc[match.stage] = [];
            }
            acc[match.stage].push(match);
            return acc;
          },
          {},
        );
        const groupedUpcomingMatches = sortedUpcomingMatches.reduce(
          (acc, match) => {
            if (!acc[match.stage]) {
              acc[match.stage] = [];
            }
            acc[match.stage].push(match);
            return acc;
          },
          {},
        );
        const sortedMatchesWithResultsStages = Object.entries(
          groupedMatchesWithResults,
        ).sort(
          ([, matchesA], [, matchesB]) =>
            new Date(matchesB[0].utcDate) - new Date(matchesA[0].utcDate),
        );
        const sortedUpcomingMatchesStages = Object.entries(
          groupedUpcomingMatches,
        ).sort(
          ([, matchesA], [, matchesB]) =>
            new Date(matchesA[0].utcDate) - new Date(matchesB[0].utcDate),
        );

        // setMatches(sortedMatchesWithResults);
        setMatches(sortedMatchesWithResultsStages);
        setUpComingMatches(sortedUpcomingMatchesStages);
      } catch (error) {
        console.error("Erreur : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getMatches();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-4 text-4xl transition duration-300">
          Chargement en cours...
        </div>
      ) : (
        <div className="transition flex flex-col">
          <div className="mt-4 mb-6 flex items-center justify-center font-title font-bold">
            <h1 className="text-3xl">Les matches de la Coupe du Monde</h1>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-3/4 h-fit items-center justify-center text-2xl">
              <h1 className="text-3xl">Matchs avec résultas</h1>

              <MatchesCard matches={matches} />
            </div>
            <div className="flex flex-col w-1/4 h-fit items-center justify-center text-2xl">
              <h1>Matchs non joués</h1>

              <MatchesCard matches={upComingMatches} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
