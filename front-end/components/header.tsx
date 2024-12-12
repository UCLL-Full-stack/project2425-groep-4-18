import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "./language/Language";
import router from "next/router";

type UserType = {
  firstname: string;
  password: string;
  token: string;
};
const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    } else {
      // Redirect to login page if no user is found in localStorage
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loggedInUser && isTokenExpired()) {
        // Token has expired, log out immediately
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        router.push("/login"); // Optionally redirect to login page
      }
    }, 1000); // Check every second for token expiry

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [loggedInUser]);
  
  function isTokenExpired() {
    const expiry = JSON.parse(atob(loggedInUser!.token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex mb-2 md:mb-5 text-white-50 text-3xl text-gray-300"></a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className="px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Home
        </Link>
        <Link
          href="/subscriptionPlan"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          subscription
        </Link>
        <Link
          href="/create"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          create
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
            {loggedInUser.firstname}
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
