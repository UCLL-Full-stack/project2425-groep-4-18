import subscriptionService from "@/services/subscriptionService";
import { SubscriptionPlan, User } from "@/types";
import exp from "constants";
import { useState } from "react";

type Props = {
  subscriptionPlan: SubscriptionPlan;
  user: User;
};

const SubscriptionForm  = ({ subscriptionPlan, user }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const handleSubscription  = async () => {

    const subScription = {
      user,
      subscriptionPlan,
    };
    const response = await subscriptionService.CreateSubscription(subScription);
    const data = await response.json();
    if (!response.ok) {
      setErrors((errors) => [...errors, data.message]);
    } else {
      setStatus("Schedule created successfully.");
    }
  };
  return (
    <div>
      {errors.length > 0 && <p className="text-danger text-red-500">{errors.join(", ")}</p>}
      {status && <p className="text-success">{status}</p>}
      
      <button onClick={handleSubscription} className="btn btn-primary">
        Confirm Subscription
      </button>
    </div>
  );
};

export default SubscriptionForm ;
