import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GroupChat, User } from "@/types";
import { use, useEffect, useState } from "react";
import Header from "@/components/header";
import ChatOverview from "@/components/chats/chatsoverview";
import useSWR from "swr";
import groupchatservice from "@/services/groupchatService";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [groupchats, setGroupChats] = useState<Array<GroupChat>>([]);
  const [selectedGroupChat, setSelectedGroupChat] = useState<GroupChat | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedInUser");
    console.log(user);
    if (user) {
      setUser(JSON.parse(user));
    }
    
  }, []);

  const selectGroupChat = (groupchat: GroupChat) => {
    setSelectedGroupChat(groupchat);
  };


  const fetcher = async (key: string) => {
    if (!user?.firstname) {
      throw new Error("User firstname is undefined");
    }
    console.log("firstname "+ user?.firstname);
    const res = await groupchatservice.getGroupchats(user.firstname);
    console.log(res);
    if (res.ok) {
        const groupchat = await res.json();
        return { groupchats: groupchat };
    }
  }

  console.log(user?.firstname);
  const { data, isLoading, error } = useSWR("groupchats", fetcher);
  
  console.log(selectedGroupChat)

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>

      <div className="flex h-screen pt-[4rem]">
        {/* Fixed Sidebar */}
        <div className="w-1/4 bg-gray-200 border-r border-gray-300 fixed top-[4rem] bottom-0">
        <div className="w-1/4 bg-gray-200 border-r border-gray-300 fixed top-[4rem] bottom-0">
          <ChatOverview
            groupchats={data?.groupchats || []}
            selectGroupChat={selectGroupChat}
            selectedGroupChat={selectedGroupChat} // Pass selectedGroupChat to ChatOverview
          />
        </div>
        </div>

        {/* Main Chat Area */}
        <div className="ml-[25%] flex-1 flex flex-col h-full">
          {/* Scrollable Chat Content */}
          <div className="flex-grow overflow-y-auto p-6">
            <div className="flex flex-col gap-4">
              {selectedGroupChat && (
                <div className="flex flex-col gap-4">
                  {selectedGroupChat.chats.map((chat, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-md ${
                        chat.user.firstname === user?.firstname
                          ? "bg-blue-200 self-end"
                          : "bg-gray-200"
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {chat.user.firstname}
                      </div>
                      <div className="text-lg">{chat.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>

          <div className="p-6 border-t border-gray-300">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <input
              id="message"
              type="text"
              placeholder="Type a message"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
