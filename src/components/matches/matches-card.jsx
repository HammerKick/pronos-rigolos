import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";
import { MatchCard } from "./match-card";

export const MatchesCard = ({ matches }) => {
  return (
    <div className="flex items-center flex-wrap gap-8 justify-center text-md p-4 bg-lime-300">
      {matches.map((match) => {
        return <MatchCard match={match} />;
      })}
    </div>
  );
};
