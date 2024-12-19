import Header from "@/components/header";
import UserOverview from "@/components/users/userOverview";
import userService from "@/services/userService";
import { SessionUser, StatusMessage, User } from "@/types";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { use, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

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

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  const fetcher = async () => {
    if (!user?.firstname) return null;
    try {
      const res = await userService.getUsers();
      if (res.ok) {
        return { Users: await res.json() };
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setStatusMessage({
        type: "error",
        message: "Error fetching users.",
      });
    }
    return null;
  };

  const { data, isLoading, error } = useSWR("users", fetcher);

  const handleDelete = async (userId: number) => {
    try {
      const res = await userService.deleteUser(userId);
      if (res.ok) {
        setStatusMessage({
          type: "success",
          message: "User deleted successfully.",
        });
        mutate("users");
        setSelectedUser(null);
      } else {
        setStatusMessage({
          type: "error",
          message: "Error deleting user.",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setStatusMessage({
        type: "error",
        message: `Error deleting user: ${error}`,
      });
    }
  };

  // Filter out the logged-in user from the list of users
  const filteredUsers = data?.Users.filter((u: User) => u.firstname !== user?.firstname) || [];

  if (user?.role !== "admin") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="text-center text-xl text-red-500 py-5">
          Unauthorized - You do not have access to this page.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {statusMessage && (
        <div
          className={`text-center text-xl py-3 ${
            statusMessage.type === "success"
              ? "text-green-500"
              : statusMessage.type === "error"
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          {statusMessage.message}
        </div>
      )}
      {isLoading ? (
        <div className="text-center text-xl text-indigo-500 py-5">Loading users...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500 py-5">Error loading users: {error.message}</div>
      ) : (
        <>
          <UserOverview
            users={filteredUsers} // Pass the filtered users (without the logged-in user)
            selectedUser={selectedUser}
            selectUser={selectUser}
          />
          {selectedUser && (
            <div className="mt-5 text-center">
              <button
                onClick={() => selectedUser?.id !== undefined && handleDelete(selectedUser.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete User
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Users;
