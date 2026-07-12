import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";

const statusLabels = {
  FINISHED: "Terminé",
  IN_PLAY: "En cours",
  TIMED: "À venir",
};

const durationLabels = {
  REGULAR: "Temps normal",
  EXTRA_TIME: "Temps additionnel",
  PENALTY_SHOOTOUT: "Pénalties",
};

export const MatchDetails = ({ match, key }) => (
  <div className="font-bold border-white  shadow-md  duration-150 p-20 bg-lime-200 rounded-xl">
    <div>
      <div className="flex flex-row gap-6">
        <MatchTeam
          team={match.homeTeam}
          score={match.score}
          side="home"
          winner={match.score.winner}
        />
        <img src={match.competition.emblem} className="w-10 h-10" />

        <MatchTeam
          team={match.awayTeam}
          score={match.score}
          side="away"
          winner={match.score.winner}
        />
      </div>
    </div>
    <div className="flex flex-col justify-center items-center">
      <div className="text-base text-gray-500">
        {statusLabels[match.status]}
      </div>
      <time dateTime={match.utcDate} className="text-base text-gray-500">
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "long",
        }).format(new Date(match.utcDate))}
      </time>
    </div>
    <div className="text-lg flex items-center  justify-center">
      Durée: {durationLabels[match.score.duration]}
    </div>
    <div className="text-lg flex items-center text-gray-500 justify-center">
      Arbitre: {match.referees?.[0]?.name}
    </div>
  </div>
);
