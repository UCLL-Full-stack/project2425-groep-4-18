import { Chat, GroupChat, User } from "@/types";
import { useEffect, useState } from "react";


type Props = {
  groupchats: Array<GroupChat>;
  selectGroupChat: (groupchat: GroupChat) => void;
  selectedGroupChat: GroupChat | null;
}



const ChatOverview: React.FC<Props> = ({ groupchats, selectGroupChat, selectedGroupChat }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
    console.log(loggedInUser);
  }, []);

  return (
    <div className="w-1/4 bg-gray-200 border-r border-gray-300 fixed top-[4rem] bottom-0">
      <ul className="h-full overflow-y-auto">
        {groupchats.map((groupchat, index) => (
          <li
            key={index}
            className={`p-4 border-b border-gray-300 cursor-pointer ${
              selectedGroupChat?.id === groupchat.id ? 'bg-blue-200' : 'bg-white'
            }`} // Highlight if selected
            onClick={() => selectGroupChat(groupchat)} // Handle group chat selection
          >
            {groupchat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatOverview;