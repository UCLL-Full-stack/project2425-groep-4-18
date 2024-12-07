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
        <title>Title</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 border-r border-gray-300">
          <ul>
            <li className="p-4 border-b border-gray-300">Chat 1</li>
            <li className="p-4 border-b border-gray-300">Chat 2</li>
            <li className="p-4 border-b border-gray-300">Chat 3</li>
          </ul>
        </div>

        <div className="flex-1 bg-white">
          <div className="p-6">
            <h2 className="text-xl">Chat 1</h2>
            <div className="mt-4">
              <p>
                <strong>User 1:</strong> Hello!
              </p>
              <p>
                <strong>You:</strong> Hi there!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
