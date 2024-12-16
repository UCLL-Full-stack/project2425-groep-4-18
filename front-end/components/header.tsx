import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Language from "./language/Language";
import router from "next/router";
import Dropdown from "./profile/dropdown";
import styles from "@/styles/Home.module.css";

type UserType = {
  firstname: string;
  password: string;
  token: string;
};
const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const { t } = useTranslation();

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
          {t("header.home")}
        </Link>
        <Link
          href="/subscriptionPlan"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          {t("header.subscription")}
        </Link>
        <Link
          href="/create"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          {t("header.create")}
        </Link>
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.login")}
          </Link>
        )}
        <div>
          <Language />
        </div>
        <div className="flex justify-end">{loggedInUser && <Dropdown />}</div>
      </nav>
    </header>
  );
};

export default Header;
