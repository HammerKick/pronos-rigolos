import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";

const statusLabels = {
  FINISHED: "Terminé",
  IN_PLAY: "En cours",
  TIMED: "À venir",
};

export const MatchCard = ({ match, key }) => (
  <Link to={`/match/${match.id}`} key={key}>
    <div className="font-bold border-white shadow-md hover:scale-110 duration-150 p-2 bg-lime-200  hover:cursor-pointer rounded-xl">
      <div>
        <div className="flex flex-row gap-2">
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
    </div>
  </Link>
);
