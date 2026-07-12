import React from "react";

export const MatchTeam = ({ team, score, side, winner }) => {
  const isHome = side === "home";
  const isWinner =
    (isHome && winner === "HOME_TEAM") || (!isHome && winner === "AWAY_TEAM");
  return (
    <div className="flex flex-col w-20">
      <div className="w-full flex items-center justify-start gap-1">
        {isHome && (team?.tla ?? "TBA")}
        <img
          src={team?.crest ?? "/crest_48dp.png"}
          className={`w-8 h-8 ${isHome ? "ml-auto" : "mr-auto"}`}
        />
        {!isHome && (team?.tla ?? "TBA")}
      </div>
      <div className="flex items-center justify-between">
        <span
          className={` ${isHome ? "ml-auto" : ""} ${isWinner ? "text-gray-900 text-lg" : "text-gray-500"}`}
        >
          {isHome ? score.fullTime.home : score.fullTime.away}
        </span>
      </div>
    </div>
  );
};
