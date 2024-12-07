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

const subscriptionPlanService = {
  getAllSubscriptionPlans,
};
export default subscriptionPlanService;
