import { Subscription } from "@/types";


const CreateSubscription = (subscription: Subscription) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
};

const subscriptionService = {
  CreateSubscription,
};

export default subscriptionService;
