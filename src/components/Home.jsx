import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold font-title mt-6">
          Pronos rapides et rigolos !
        </h1>
        <div className="mt-4 text-xl">
          Pronostiquez, comparez, défiez vos amis
        </div>

        <div className="mt-8 flex flex-row gap-4 text-white font-title">
          <div
            className="bg-blue-500 hover:bg-blue-300 hover:cursor-pointer p-4 rounded-lg"
            onClick={() => navigate("/matches")}
          >
            Voir les matchs
          </div>
          <div
            className="bg-blue-500 hover:bg-blue-300 hover:cursor-pointer p-4 rounded-lg"
            onClick={() => navigate("/teams")}
          >
            Voir les équipes
          </div>
        </div>
      </div>
    </>
  );
}
