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
        const upcomingMatchesWithoutResult = result.matches.filter(
          (match) => match.status === "TIMED",
        );
        const sortedMatchesWithResults = [...matchesResults].sort(
          (a, b) => new Date(b.utcDate) - new Date(a.utcDate),
        );
        const sortedUpcomingMatches = [...upcomingMatchesWithoutResult].sort(
          (a, b) => new Date(a.utcDate) - new Date(b.utcDate),
        );

        setMatches(sortedMatchesWithResults);
        setUpComingMatches(sortedUpcomingMatches);
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
          <div className="flex gap-8">
            <div className="flex flex-col w-3/4 h-fit bg-amber-700 items-center justify-center text-2xl">
              <h1 className="bg-blue-500 text-3xl">Matchs avec résultas</h1>

              <MatchesCard matches={matches} />
            </div>
            <div className="flex flex-col w-1/4 h-fit bg-amber-700 items-center justify-center text-2xl">
              <h1>Matchs non joués</h1>

              <MatchesCard matches={upComingMatches} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
