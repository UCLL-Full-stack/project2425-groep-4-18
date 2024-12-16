import { Subscription } from "@/types";


const CreateSubscription = (subscription: Subscription) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(subscription),
   
  });
};

const getSubscriptionByFistname = (firstname:string) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  const res = fetch(process.env.NEXT_PUBLIC_API_URL + `/subscription/user?firstname=${firstname}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  return res;
};

const subscriptionService = {
  CreateSubscription,
  getSubscriptionByFistname
};

export default subscriptionService;
