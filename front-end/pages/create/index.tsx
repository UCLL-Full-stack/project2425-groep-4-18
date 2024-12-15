import React, { useEffect, useState } from 'react';
import useSWR from 'swr'; // Import useSWR
import CreateChatForm from '@/components/chats/createchatform';
import { User, GroupChat } from '@/types'; // Import types
import userService from '@/services/userService';
import groupchatservice from '@/services/groupchatService';
import Header from '@/components/header';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Fetcher function to get the users
const fetchUsers = async (): Promise<User[]> => {
  const response = await userService.getUsers();
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Fetcher function to get the group chats (uses the first user's name or another approach)
const fetchGroupChats = async (user: User): Promise<GroupChat[]> => {
  const response = await groupchatservice.getGroupchats(user.firstname);
  if (!response.ok) {
    throw new Error('Failed to fetch group chats');
  }
  return response.json();
};

const CreateChatPage: React.FC = () => {
  // Fetching users using useSWR
  const { data: users, error: usersError, isLoading: usersLoading } = useSWR<User[]>('users', fetchUsers);

  // State to store group chats
  const [groupchats, setGroupchats] = useState<GroupChat[]>([]);

  // Fetch group chats only when users are loaded and the first user is available
  useEffect(() => {
    if (users && users.length > 0) {
      const fetchChats = async () => {
        try {
          const chats = await fetchGroupChats(users[0]); // Fetch group chats for the first user
          setGroupchats(chats);
        } catch (error) {
          console.error('Error fetching group chats:', error);
        }
      };
      fetchChats();
    }
  }, [users]); // Fetch group chats only when users data is loaded

  if (usersLoading) {
    return <p>Loading users...</p>;
  }

  if (usersError) {
    return <p className="text-red-500">{`Error fetching users: ${usersError.message}`}</p>;
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <CreateChatForm users={users || []}/>
    </>
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

export default CreateChatPage;
