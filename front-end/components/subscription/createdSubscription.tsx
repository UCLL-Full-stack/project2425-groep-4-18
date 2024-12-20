import subscriptionService from "@/services/subscriptionService";
import { SubscriptionPlan, User } from "@/types";
import { useState } from "react";

type Props = {
  subscriptionPlan: SubscriptionPlan;
  user: User;
};

const SubscriptionForm = ({ subscriptionPlan, user }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubscription = async () => {
    setIsLoading(true);
    setErrors([]);
    setStatus("");

    const subscription = {
      user,
      subscriptionPlan,
    };

    try {
      const response = await subscriptionService.CreateSubscription(subscription);
      const data = await response.json();

      if (!response.ok) {
        setErrors((errors) => [...errors, data.message]);
      } else {
        setStatus("Subscription created successfully.");
      }
    } catch (error) {
      setErrors((errors) => [...errors, "An unexpected error occurred."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subscription-form max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Confirm Your Subscription</h2>

      {errors.length > 0 && (
        <div className="alert alert-error bg-red-100 text-red-700 p-4 rounded mb-4">
          <strong>Error:</strong> {errors.join(", ")}
        </div>
      )}

      {status && (
        <div className="alert alert-success bg-green-100 text-green-700 p-4 rounded mb-4">
          {status}
        </div>
      )}

      <button
        onClick={handleSubscription}
        className={`btn btn-primary w-full py-2 rounded font-semibold ${
          isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Confirm Subscription"}
      </button>
    </div>
  );
};

export default SubscriptionForm;

