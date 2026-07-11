import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { API_URL, API_KEY } from "../../config";

export default function InfosMatches() {
  const [match, setMatch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { teamId } = useParams();

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await fetch(`${API_URL}matches/${matchId}`, {
          method: "GET",
          headers: {
            "X-Auth-Token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setMatch(result);
      } catch (error) {
        console.error("Erreur : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getMatch();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-4 text-4xl transition duration-300">
          Chargement en cours...
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-6xl font-bold font-title mt-8 gap-8">
          <span className="flex flex-row gap-8">
            <img src={match.area.flag} className="w-16 h-16" />{" "}
            {match.shortName}
          </span>
          <span className="text-lg">
            Niveau : {match.stage} Status:{match.status} Home team(
            {match.homeTeam.shortName} Away team({match.awayTeam.shortName})
          </span>
        </div>
      )}
    </>
  );
}
