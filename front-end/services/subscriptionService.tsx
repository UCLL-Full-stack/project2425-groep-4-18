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

const subscriptionService = {
  CreateSubscription,
};

export default subscriptionService;
