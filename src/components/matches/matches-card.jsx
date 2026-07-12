import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";
import { MatchCard } from "./match-card";

export const MatchesCard = ({ matches }) => {
  let lastStage = "";
  return (
    <div className="flex items-center flex-wrap gap-10 justify-center text-md p-4 bg-lime-300 mt-4">
      {matches.map((match) => {
        const displayStage = lastStage !== match.stage;
        lastStage = match.stage;
        return (
          <div key={match.id}>
            {displayStage && (
              <h1 className="text-xl font-bold">{match.stage}</h1>
            )}
            <MatchCard match={match} />{" "}
          </div>
        );
      })}
    </div>
  );
};
