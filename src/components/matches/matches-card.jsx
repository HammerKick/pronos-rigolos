import React from "react";
import { Link } from "react-router";
import { MatchTeam } from "./match-team";
import { MatchCard } from "./match-card";

const stageLabels = {
  FINAL: "Finale",
  QUARTER_FINALS: "Quart de finale",
  LAST_16: "8è de finale",
  LAST_32: "16è de finale",
  GROUP_STAGE: "Phase de groupes",
  SEMI_FINALS: "Demi finale",
  THIRD_PLACE: "Troisième place",
};

export const MatchesCard = ({ matches }) => {
  return (
    <div className=" gap-8 justify-center text-md p-4">
      {/* {matches.map((match) => {
        return <MatchCard match={match} />;
      })} */}
      {matches.map(([stage, matchess]) => (
        <section key={stage} className="mb-10">
          <h1 className="mb-6 text-2xl flex items-center justify-center font-bold">
            {stageLabels[stage]}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {matchess.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
