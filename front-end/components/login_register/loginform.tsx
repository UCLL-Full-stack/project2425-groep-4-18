import userService from "@/services/userService";
import { Role, StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
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
      setStatusMessage([{ message: "an error has accured", type: "error" }]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md"
    >
      
      <h2 className="text-2xl font-bold text-center mb-6">{t("login.title")}</h2>
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            {t("login.name")}
          </label>
          <input
            id="name"
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
  );
};

export default LoginForm;
