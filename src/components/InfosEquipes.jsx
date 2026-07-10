import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { API_URL, API_KEY } from "../config";

export default function InfosEquipes() {
  const [team, setTeam] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { teamId } = useParams();

  useEffect(() => {
    const getTeam = async () => {
      try {
        const response = await fetch(`${API_URL}teams/${teamId}`, {
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
        setTeam(result);
      } catch (error) {
        console.error("Erreur : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getTeam();
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
            <img src={team.area.flag} className="w-16 h-16" /> {team.name}
          </span>
          <span className="text-lg">
            Sélectionneur : {team.coach.firstName} {team.coach.lastName} (
            {team.coach.nationality})
          </span>
          <div className="grid grid-cols-4 gap-4 mb-6 p-4">
            {team.squad.map((player) => (
              <Link
                to={`/player/${player.id}`}
                key={player.id}
                className="flex flex-col  border-white shadow-md p-4 bg-lime-100 hover:bg-lime-200 hover:cursor-pointer"
              >
                <div className="text-2xl font-bold">{player.name}</div>
                <div className="text-lg">{player.position}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
