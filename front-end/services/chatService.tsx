import { Chat, ChatInput } from "@/types";

const addChat = (chat:ChatInput) => {
  console.log("User :" + chat.user);
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(chat),
  });

  console.log(res);
  return res;
};

const deleteChat = (chatId: number) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/chats/${chatId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const chatService = {
  addChat,
  deleteChat,
};

export default chatService;