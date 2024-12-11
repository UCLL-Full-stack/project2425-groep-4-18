import { User } from "@/types"
const URL = "http://localhost:3000/";


const registerUser = (user: User) => {
  
  return fetch(`${URL}users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

const loginUser = ({firstname, password}: {firstname: string, password: string}) => {
  return fetch(`${URL}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({firstname, password}),
  })
}

const getUsers = async () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(`${URL}users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const userService = {
  registerUser,
  loginUser,
  getUsers,
}

export default userService;