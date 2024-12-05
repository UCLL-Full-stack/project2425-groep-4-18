const getAllSubscriptionPlans = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/subscriptionPlan", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add token here
    },
  });
};

const subscriptionPlanService = {
  getAllSubscriptionPlans,
};
export default subscriptionPlanService;
