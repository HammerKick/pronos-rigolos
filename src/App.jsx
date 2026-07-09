import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./navbar/Navbar";
import Equipes from "./components/Equipes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipes" element={<Equipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
