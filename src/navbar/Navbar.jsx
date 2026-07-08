export default function Navbar() {
  return (
    <>
      <nav>
        <ul className="flex flex-row gap-8 p-4 items-center justify-center bg-[#4ddbff]">
          <li className="hover:cursor-pointer">Accueil</li>
          <li className="hover:cursor-pointer">Equipes et joueurs</li>
          <li className="hover:cursor-pointer">Profil</li>
          <li className="hover:cursor-pointer">Déconnexion</li>
        </ul>
      </nav>
    </>
  );
}
