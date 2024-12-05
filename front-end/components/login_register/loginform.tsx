import userService from "@/services/userService";
import { Role, StatusMessage } from "@/types";
import router from "next/router";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [firstname, setName] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<StatusMessage>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      firstname,
      password,
    };
    console.log(user);

    userService.loginUser(user).then(async (response) => {
      if (response.ok) {
        setStatusMessage({ message: "User Logged In", type: "success" });
        localStorage.setItem("loggedInUser", JSON.stringify({ firstname: user.firstname }));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const jsonResponse = await response.json();
        setStatusMessage({ message: `${jsonResponse.message}`, type: "error" });
      }
      });
    };


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            value={firstname}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-medium text-lg p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
        {statusMessage && <p className={`text-center mt-4 text-${statusMessage.type}`}>{statusMessage.message}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
