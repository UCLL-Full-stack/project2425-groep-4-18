import React, { useEffect, useState } from 'react';
import { GroupChat, GroupChatInput, Chat, User, ChatInput, SessionUser } from '@/types';
import userService from '@/services/userService';
import chatService from '@/services/chatService';
import groupchatservice from '@/services/groupchatService';

type Props = {
  users: Array<User>;
  };


const CreateGroupChat = ({ users }: Props) => {
  const [chatids, setChatids] = useState<number[]>([]);
  const [groupChatName, setGroupChatName] = useState<string>(''); 
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<SessionUser | null>(null); 
  const [statusMessage, setStatusMessage] = useState<string>(''); 

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
        console.log("User logged in:", localStorage.getItem("loggedInUser")); // Debug logged in user
      } catch (error) {
        console.error("Error parsing logged in user:", error);
      }
    }
  }, []);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    const selectedUsersArray = users.filter(user =>
      user.firstname && selectedOptions.includes(user.firstname) && user.firstname !== loggedInUser?.firstname
    );
    setSelectedUsers(selectedUsersArray);
  };

  const handleGroupChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupChatName(event.target.value.trimStart()); // Avoid leading spaces
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!groupChatName || selectedUsers.length === 0) {
      console.error('Group chat name and users are required');
      setStatusMessage('Please provide a group chat name and select users.');
      return;
    }

    setStatusMessage('Creating group chat...'); // Show loading status message

    try {
      // 1. Create the group chat first
      const groupChatRes = await groupchatservice.creategroupchat({
        name: groupChatName,
        createdAt: new Date(),
        description: `Group chat created by ${loggedInUser?.firstname}`,
      });

      if (groupChatRes) {
        const groupChat = await groupChatRes.json();
        const groupChatId = groupChat.id;
        console.log('Group chat created:', groupChat);

        // 2. Send a chat message for each selected user
        for (const user of [...selectedUsers, loggedInUser]) {
          console.log('Selected user:', user); // Debug selected user

          const chat: ChatInput = {
            message: `${user?.firstname} has been added to the group chat: ${groupChatName}`,
            user: user?.firstname || '',
            createdAt: new Date(),
          };

          const res = await chatService.addChat(chat);

          if (res.ok) {
            const chatId = await res.json();
            setChatids((prevChatIds) => [...prevChatIds, chatId]);
            console.log('Chat added:', chatId);

            // Add chat to group chat
            const addChatRes = await groupchatservice.addchat(groupChatId, chatId.id);
            if (addChatRes) {
              console.log('Chat added to group chat:', addChatRes);
            }
          }
        }

        setStatusMessage('Group chat created successfully!'); // Success message
      }
    } catch (error) {
      console.error('Error during group chat creation:', error);
      setStatusMessage('Error creating group chat. Please try again.'); // Error message
  };
}

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
      {users.length > 0 ? (
        <div className="flex flex-col items-center mt-4">
          <label className="text-xl">Add Users</label>
          <select
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
            name="users"
            multiple
            required
            onChange={handleUserChange}
          >
            {users
              .filter(user => user.firstname !== loggedInUser?.firstname) 
              .map(user => (
                <option key={user.id} value={user.firstname}>
                  {user.firstname} {user.name} {user.role}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <p>Loading users...</p> // Display a message if users are still being fetched
      )}

    <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Create Group Chat
        </button>
      </div>

    
      {statusMessage && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-center text-sm text-gray-700">{statusMessage}</p>
        </div>
      )}
    </form>
  );
};


export default CreateGroupChat;
