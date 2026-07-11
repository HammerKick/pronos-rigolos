import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./navbar/Navbar";
import Equipes from "./components/Equipes";
import Matches from "./components/matches/matches";
import InfosEquipes from "./components/InfosEquipes";
import InfosMatches from "./components/matches/info-matches";
import Joueur from "./components/Joueur";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Equipes />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/team/:teamId" element={<InfosEquipes />} />
          <Route path="/match/:matchId" element={<InfosMatches />} />
          <Route path="/player/:playerId" element={<Joueur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
