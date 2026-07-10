import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL, API_KEY } from "../config";

export default function Equipes() {
  const [teams, setTeams] = useState([]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch(`${API_URL}competitions/WC/teams`, {
          method: "GET",
          headers: {
            "X-Auth-Token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        setTeams(result.teams);
      } catch (error) {
        console.error("Erreur : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getTeams();
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
            <h1 className="text-6xl">Les équipes de la Coupe du Monde</h1>
          </div>
          <ul className="grid grid-cols-8 gap-4 text-md p-4 mt-4">
            {teams.map((team) => (
              <Link to={`/team/${team.id}`} key={team.id}>
                <li className="flex flex-row gap-4 font-bold border-white shadow-md p-4 bg-lime-100 hover:bg-lime-200 hover:cursor-pointer">
                  <img src={team.area.flag} className="w-8 h-8" /> {team.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
