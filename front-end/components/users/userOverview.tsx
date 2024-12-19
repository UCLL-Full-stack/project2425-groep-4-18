import { User } from "@/types";

type Props = {
  users: Array<User>;
  selectUser: (user: User) => void;
  selectedUser: User | null;
};

const UserOverview: React.FC<Props> = ({ users, selectUser, selectedUser }) => {
 
  if (users.length === 0) {
    return <div>No users available.</div>;
  }


  const handleSelectUser = (user: User) => {
    selectUser(user); 
  };

  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-200' : ''}`}
              onClick={() => handleSelectUser(user)}
            >
              <td className="px-4 py-2 border-b">{user.firstname} {user.name}</td>
              <td className="px-4 py-2 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <h3 className="font-bold">Selected User:</h3>
          <p><strong>Name:</strong> {selectedUser.firstname} {selectedUser.name}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </div>
      )}
    </div>
  );
};



export default UserOverview;
