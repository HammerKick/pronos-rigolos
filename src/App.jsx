import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./navbar/Navbar";
import Equipes from "./components/Equipes";
import InfosEquipes from "./components/InfosEquipes";
import Joueur from "./components/Joueur";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Equipes />} />
          <Route path="/team/:teamId" element={<InfosEquipes />} />
          <Route path="/player/:playerId" element={<Joueur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
