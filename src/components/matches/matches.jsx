import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL, API_KEY } from "../../config";
import { MatchTeam } from "./match-team";

export default function Matches() {
  const [matches, setMatches] = useState([]);
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
        const results = result.matches;
        const sortedMatches = [...result.matches].sort(
          (a, b) => new Date(b.utcDate) - new Date(a.utcDate),
        );

        setMatches(sortedMatches);
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
        <div className="transition">
          <div className="flex flex-col mt-6 items-center justify-center font-title font-bold">
            <h1 className="text-6xl">Les matches de la Coupe du Monde</h1>
          </div>
          <div className="flex items-center flex-wrap gap-10 justify-center text-md p-4 mt-4">
            {matches.map((match) => (
              <Link to={`/match/${match.id}`} key={match.id}>
                <li className="flex flex-row gap-4 p-4 font-bold border-white shadow-md hover:scale-110 duration-150  bg-gray-500  hover:cursor-pointer">
                  <MatchTeam
                    team={match.homeTeam}
                    score={match.score}
                    side="home"
                    winner={match.score.winner}
                  />
                  <img src={match.competition.emblem} className="w-8 h-8" />
                  <MatchTeam
                    team={match.awayTeam}
                    score={match.score}
                    side="away"
                    winner={match.score.winner}
                  />
                </li>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
