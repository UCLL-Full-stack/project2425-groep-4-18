import Header from "@/components/header";
import SubscriptionPlanTable from "@/components/subscription/subscriptionPlanTable";
import subscriptionPlanService from "@/services/subscriptionPlanService";
import userService from "@/services/userService";
import { SubscriptionPlan } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Register: React.FC = () => {
  const [subscriptionPlans, setsubscriptionPlans] =
    useState<Array<SubscriptionPlan>>();
  const [error, setError] = useState<string>();
  const [selectedSubscriptioPlan, setSelectedSubscriptionPlan] =
    useState<SubscriptionPlan | null>(null);

  const getSubscriptionplans = async () => {
    setError("");
    const response = await subscriptionPlanService.getAllSubscriptionPlans();

    if (!response.ok) {
      setError(response.statusText);
    } else {
      const subscriptionPlan = await response.json();
      setsubscriptionPlans(subscriptionPlan);
    }
  };

  useEffect(() => {
    getSubscriptionplans();
  }, []);

  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main className="p-6 min-h-screen flex flex-col items-center">
        <section>
          {error && <div className="text-red-800">{error}</div>}
          {subscriptionPlans && (
            <SubscriptionPlanTable
              subscriptionplans={subscriptionPlans}
              selectSubscriptionPlan={setSelectedSubscriptionPlan}
            />
          )}
        </section>
      </main>
      <div className="container mx-auto">
        <p>kfdl</p>
      </div>
    </>
  );
};

export default Register;
