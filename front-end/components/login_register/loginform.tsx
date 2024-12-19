import userService from "@/services/userService";
import { Role, StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [firstname, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessage([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!firstname && firstname.trim() === "") {
      setNameError(t("login.nameError"));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t("login.passwordError"));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { firstname, password };
    const response = await userService.loginUser(user);

    if (response.status === 200) {
      setStatusMessage([{ message: "login.succes", type: "success" }]);

      const user = await response.json();
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: user.id,
          token: user.token,
          fullname: user.fullname,
          firstname: user.firstname,
          role: user.role,
        })
      );
      console.log("User logged in:", localStorage.getItem("loggedInUser"));
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (response.status === 400) {
      const { message } = await response.json();
      console.log("Error response:", message);
      setStatusMessage([{ message: message, type: "error" }]);
    } else {
      setStatusMessage([{ message: "an error has occurred", type: "error" }]);
    }
  };

  // Define a static list of users to be shown in the table
  const users = [
    { name: 'hermans', firstname: 'frans', password: 'frans123', role: 'lecturer' },
    { name: 'janssesn', firstname: 'jan', password: 'jan123', role: 'student' },
    { name: 'istrator', firstname: 'admin', password: 'admin123', role: 'admin' },
    { name: 'hendrickxs', firstname: 'marie', password: 'marie123', role: 'student' },
    { name: 'geets', firstname: 'paul', password: 'paul123', role: 'lecturer' },

];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("login.title")}
        </h2>
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-gray-700 font-medium mb-2"
            >
              {t("login.name")}
            </label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              placeholder={t("login.nameInput")}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {nameError && <div className="text-red-800 ">{nameError}</div>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder={t("login.passwordInput")}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium text-lg p-2 rounded-md hover:bg-blue-600"
          >
            {t("login.title")}
          </button>
          <Link
            href="/register"
            className=" text-blue-500 underline"
          >
            create a account
          </Link>
        </div>
        {statusMessage && (
          <div className="row">
            <ul className="list-none mb-3 mx-auto ">
              {statusMessage.map(({ message, type }, index) => (
                <li
                  key={index}
                  className={classNames({
                    "text-red-800": type === "error",
                    "text-green-800": type === "success",
                  })}
                >
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Table to display users below the login form */}
      <div className="mt-6 max-w-4xl mx-auto">
        <h2 className="text-xl text-center mb-4">User Table</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">firstname</th>
              <th className="px-4 py-2 border-b">Password</th>
              <th className="px-4 py-2 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{user.firstname}</td>
                <td className="px-4 py-2 border-b">{user.password}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LoginForm;
