import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import router from "next/router";

type UserType = {
  firstname: string;
  password: string;
  token: string;
};
const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const { t } = useTranslation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user)); // Parse the user object from localStorage
    } else {
      setLoggedInUser(null); // In case no user is logged in
    }
  }, []);

  const getFirstLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={toggleDropdown}
        className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
      >
        <div className="h-8 w-8 bg-gray-400 text-black rounded-full flex items-center justify-center">
          {loggedInUser ? getFirstLetter(loggedInUser.firstname) : ""}
        </div>
      </button>
      <ul className={`${styles.dropdownMenu} ${!isOpen ? styles.hidden : ""}`}>
        <li>
          <a href="/mySubscription">
            my subscription
          </a>
        </li>
        <li>
          <a href="/login" onClick={handleClick}>
            {t("header.logout")}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
