const getAllSubscriptionPlans = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/subscriptionPlan", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriptionPlanById = (subscriptionPlanId: string) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/subscriptionPlan/${subscriptionPlanId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add token here
    },
  });
};

const subscriptionPlanService = {
  getAllSubscriptionPlans,
  getSubscriptionPlanById
};
export default subscriptionPlanService;
