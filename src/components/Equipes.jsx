import { useEffect, useState } from "react";

export default function Equipes() {
  const [teams, setTeams] = useState([]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_FOOTBALL_API_URL;
  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch(`${apiUrl}competitions/WC/teams`, {
          method: "GET",
          headers: {
            "X-Auth-Token": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        setTeams(result.teams);
      } catch (error) {
        console.error("Erreur : " + error);
      }
    };

    getTeams();
  }, []);

  useEffect(() => {}, [teams]);

  return (
    <>
      <div className="flex flex-col mt-6 items-center justify-center font-title font-bold">
        <h1 className="text-6xl">Les équipes de la Coupe du Monde</h1>
      </div>
      <ul className="grid grid-cols-8 gap-4 text-md p-4 mt-4">
        {teams.map((team) => (
          <li
            key={team.id}
            className="flex flex-row gap-4 font-bold border-white shadow-md p-4 bg-lime-100 hover:bg-lime-200 hover:cursor-pointer"
          >
            <img src={team.area.flag} className="w-8 h-8" /> {team.name}
          </li>
        ))}
      </ul>
    </>
  );
}
