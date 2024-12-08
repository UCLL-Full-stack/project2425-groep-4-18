const getGroupchats = (firstname:string) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  const res = fetch(process.env.NEXT_PUBLIC_API_URL + "/groupchats/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({firstname}),
  });

  console.log(res);
  return res;
};


const groupchatservice = {
  getGroupchats,
};

export default groupchatservice;