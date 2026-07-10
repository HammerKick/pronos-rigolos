import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { API_URL, API_KEY } from "../config";

export default function Joueur() {
  const [player, setPlayer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { playerId } = useParams();

  useEffect(() => {
    const getPlayerInfos = async () => {
      try {
        const response = await fetch(`${API_URL}persons/${playerId}`, {
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
        setPlayer(result);
      } catch (error) {
        console.error("Erreur : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getPlayerInfos();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-4 text-4xl transition duration-300">
          Chargement en cours...
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-6xl font-bold mt-8 gap-8">
          <div className="font-title">
            {player.name} - #{player.shirtNumber}
          </div>
          <div className="text-2xl">
            {player.nationality} - {player.position}
          </div>
          <Link
            to={`/team/${player.currentTeam.id}`}
            key={player.currentTeam.id}
            className="bg-blue-500 hover:bg-blue-300 hover:cursor-pointer p-4 rounded-md text-sm text-white"
          >
            {"<-"} Retour à l'équipe {player.currentTeam.name}
          </Link>
        </div>
      )}
    </>
  );
}
