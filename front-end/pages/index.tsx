import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { User } from "@/types";
import { use, useEffect, useState } from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
        <Header />
      </div>

      <div className="flex h-screen pt-[4rem]">
        {/* Fixed Sidebar */}
        <div className="w-1/4 bg-gray-200 border-r border-gray-300 fixed top-[4rem] bottom-0">
          <ul className="h-full overflow-y-auto">
            <li className="p-4 border-b border-gray-300">Chat 1</li>
            <li className="p-4 border-b border-gray-300">Chat 2</li>
            <li className="p-4 border-b border-gray-300">Chat 3</li>
          </ul>
        </div>

        {/* Main Chat Area */}
        <div className="ml-[25%] flex-1 flex flex-col h-full">
          {/* Scrollable Chat Content */}
          <div className="flex-grow overflow-y-auto p-6">
            <h2 className="text-xl mb-4">Chat 1</h2>
            <div>
              <p>
                <strong>User 1:</strong> Hello!
              </p>
              <p>
                <strong>You:</strong> Hi there!
              </p>
              {[...Array(30)].map((_, i) => (
                <p key={i}>
                  <strong>User {i % 2 ? "1" : "You"}:</strong> Message {i + 1}
                </p>
              ))}
            </div>
          </div>

          {/* Sticky Input Field */}
          <div className="p-4 border-t border-gray-300 bg-white">
            <input
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
