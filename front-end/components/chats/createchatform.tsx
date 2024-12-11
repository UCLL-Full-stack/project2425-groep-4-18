import React, { useState } from 'react';
import { GroupChat, GroupChatInput, Chat, User, ChatInput } from '@/types';
import userService from '@/services/userService';
import chatService from '@/services/chatService';
import groupchatservice from '@/services/groupchatService';

type Props = {
  users: Array<User>;
  currentUser: User | undefined;  // Make currentUser optional (undefined can be handled)
};

const CreateGroupChat = ({ users, currentUser }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupChatName, setGroupChatName] = useState<string>(''); 
  const [chatid, setChatId] = useState<number[]>([]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    const selectedUsersArray = users.filter(user => 
      user.id !== undefined && selectedOptions.includes(user.id.toString()) && user.id !== currentUser?.id // Safely access currentUser
    );
    setSelectedUsers(selectedUsersArray);
  };

  // Handle group chat name change
  const handleGroupChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupChatName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Create the chat objects for each selected user and send to the server
    for (const user of selectedUsers) {
      const chat: ChatInput = {
        message: `message by: ${user.firstname} ${user.name}`, // Corrected to use firstname and lastname
        user: user.firstname,
        createdAt: new Date(),
      };
      const res = await chatService.addChat(chat);
      if (!res.ok) {
        console.error('Failed to create chat:', res);
        return;
      }
      const data = await res.json();
      setChatId((prev) => [...prev, data.id]);
    }

    // 2. Create the group chat object with the current date (no need for a date picker)
    const newGroupChat: GroupChatInput = {
      name: groupChatName,
      createdAt: new Date(),  // Automatically set the creation date to now
      description: 'Group chat description',
    };

    // Assuming an API call to create the group chat
    const createdGroupChatResponse = await groupchatservice.creategroupchat(newGroupChat);
    if (!createdGroupChatResponse.ok) {
      console.error('Failed to create group chat:', createdGroupChatResponse);
      return;
    }
    const createdGroupChat = await createdGroupChatResponse.json();

    // Add created chats to the group chat
    await Promise.all(chatid.map(async (id) => {
      await groupchatservice.addchat(createdGroupChat.id, id);
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Group Chat Name */}
      <div className="flex flex-col items-center">
        <label className="text-xl">Group Chat Name</label>
        <input
          type="text"
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter group chat name"
          value={groupChatName}
          onChange={handleGroupChatNameChange}
          required
        />
      </div>

      {/* Users Dropdown (multi-select) */}
      <div className="flex flex-col items-center">
        <label className="text-xl">Add Users</label>
        <select
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
          name="users"
          multiple
          required
          onChange={handleUserChange}
        >
          {users?.filter(user => user.id !== currentUser?.id).map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstname} {user.name}  {/* Corrected to show firstname and lastname */}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg mt-4"
        >
          Create Group Chat
        </button>
      </div>
    </form>
  );
};

export default CreateGroupChat;
