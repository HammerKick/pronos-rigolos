import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";

export const MatchCard = ({ match }) => (
  <Link to={`/match/${match.id}`} key={match.id}>
    <li className="flex flex-row gap-4 p-4 font-bold border-white shadow-md hover:scale-110 duration-150 bg-lime-200  hover:cursor-pointer">
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
    </li>
  </Link>
);
