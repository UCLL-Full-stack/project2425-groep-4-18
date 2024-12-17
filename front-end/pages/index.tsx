import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import ChatOverview from "@/components/chats/chatsoverview";
import useSWR, { mutate } from "swr";
import groupchatservice from "@/services/groupchatService";
import chatService from "@/services/chatService";
import { Chat, ChatInput, GroupChat, SessionUser } from "@/types";
import useInterval from "use-interval";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";

export default function Home() {
  const { t } = useTranslation();
  const [selectedGroupChat, setSelectedGroupChat] = useState<GroupChat | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing logged in user:", error);
      }
    }
  }, []);

  const selectGroupChat = (groupchat: GroupChat) => {
    setSelectedGroupChat(groupchat);
  };

  const groupfetcher = async () => {
    if (!user?.firstname) return null;
    try {
      const res = await groupchatservice.getGroupchats(user.firstname);
      if (res.ok) {
        return { groupchats: await res.json() };
      }
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
    return null;
  };

  const { data, isLoading, error } = useSWR("groupchats", groupfetcher);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroupChat || !user?.firstname) return;

    const form = event.currentTarget;
    const input = form.querySelector("input");

    if (input && input.value) {
      const message = input.value;

      const chat: ChatInput = {
        message,
        user: user.firstname,
        createdAt: new Date(),
      };

      try {
        const res = await chatService.addChat(chat);
        if (res.ok) {
          const newChat: Chat = await res.json();
          const resGroupChat = await groupchatservice.addchat(selectedGroupChat.id, newChat.id);
          if (resGroupChat.ok) {
            const updatedGroupChat: GroupChat = await resGroupChat.json();
            setSelectedGroupChat((prev) =>
              prev ? { ...prev, chats: [...prev.chats, newChat] } : prev
            );
            mutate("groupchats", (currentData: any) => {
              if (currentData) {
                return {
                  groupchats: currentData.groupchats.map((group: GroupChat) =>
                    group.id === updatedGroupChat.id ? updatedGroupChat : group
                  ),
                };
              }
              return currentData;
            });
            input.value = "";
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    if (!selectedGroupChat || !user) return;
    try {
      const res = await chatService.deleteChat(chatId);
      if (res.ok) {
        setSelectedGroupChat((prev) => {
          if (prev) {
            const updatedChats = prev.chats.filter((chat) => chat.id !== chatId);
            return { ...prev, chats: updatedChats };
          }
          return prev;
        });
        mutate("groupchats", (currentData: any) => {
          if (currentData) {
            return {
              groupchats: currentData.groupchats.map((group: GroupChat) =>
                group.id === selectedGroupChat.id
                  ? { ...group, chats: group.chats.filter((chat: Chat) => chat.id !== chatId) }
                  : group
              ),
            };
          }
          return currentData;
        });
      }
    } catch (error) {
      console.error("Error deleting chat message:", error);
    }
  };

  useInterval(() => {
    mutate("groupchats", (currentData: any) => {
      if (currentData && selectedGroupChat) {
        const updatedGroupChat = currentData.groupchats.find(
          (group: GroupChat) => group.id === selectedGroupChat.id
        );

        if (updatedGroupChat) {
          setSelectedGroupChat(updatedGroupChat);
        }
      }
      return currentData;
    });
  }, 1000);

  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Chat Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>

      <div className="flex h-screen pt-[4rem]">
        <div className="w-1/4 bg-gray-200 border-r border-gray-300 fixed top-[4rem] bottom-0">
          <ChatOverview
            groupchats={data?.groupchats || []}
            selectGroupChat={selectGroupChat}
            selectedGroupChat={selectedGroupChat}
          />
        </div>

        <div className="ml-[25%] flex-1 flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-6">
            <div className="flex flex-col gap-4">
              {selectedGroupChat ? (
                selectedGroupChat.chats.map((chat, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-md ${
                      chat.user.firstname === user?.firstname
                        ? "bg-blue-200 self-end"
                        : "bg-gray-200"
                    }`}
                  >
                    <div className="text-sm font-medium">{chat.user.firstname}</div>
                    <div className="text-lg">{chat.message}</div>

                    {chat.user.firstname === user?.firstname && (
                      <button
                        onClick={() => handleDeleteChat(chat.id)}
                        className="text-red-500 mt-2"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">{t('chat.select')}</div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-300">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={t('chat.typeInput')}
                className="w-full p-4 border rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-4 rounded-md mt-4"
              >
                {t('chat.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
