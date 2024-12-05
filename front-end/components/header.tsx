import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "./language/Language";

const Header: React.FC = () => {

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className="px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Home
        </Link>
        <Link
          href="/groupchats"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          Groupchats
        </Link>
        <Link
          href="/profile"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          Profile
        </Link>
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            Login
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            logout
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {loggedInUser}
          </div>
        )}
        <div>
          <Language />
        </div>
      </nav>

    </header>
  );
};

export default Header;