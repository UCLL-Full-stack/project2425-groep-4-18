import { GroupChatInput } from "@/types";

const getGroupchats = (firstname:string) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/groupchats/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({firstname}),
  });

  console.log(res);
  return res;
};

const addchat = (groupchatid:number, chatId:number) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  const res = fetch(process.env.NEXT_PUBLIC_API_URL + `/groupchats/${groupchatid}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({chatId}),
  });

  console.log(res);
  return res;
}

const getGroupChatById = (groupChatId: number) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/groupchats/${groupChatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const creategroupchat = (groupchat: GroupChatInput) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/groupchats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupchat),
  });
}

const deleteGroupChat = (groupChatId: number) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/groupchats/${groupChatId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


const groupchatservice = {
  getGroupchats,
  addchat,
  getGroupChatById,
  creategroupchat,
  deleteGroupChat,
};

export default groupchatservice;