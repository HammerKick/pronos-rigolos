export default function Home() {
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
          <div className="bg-blue-500 hover:bg-blue-300 hover:cursor-pointer p-4 rounded-lg">
            Vos pronostics
          </div>
          <div className="bg-blue-500 hover:bg-blue-300 hover:cursor-pointer p-4 rounded-lg">
            Voir les équipes
          </div>
        </div>
        <div className="w-full border-t mt-8"></div>
        <div className="mt-4">
          <h2 className="text-5xl font-title font-bold">Matchs à venir</h2>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4"></div>
      </div>
    </>
  );
}
