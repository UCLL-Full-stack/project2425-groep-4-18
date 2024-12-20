import Header from "@/components/header";
import subscriptionPlanService from "@/services/subscriptionPlanService";
import SubscriptionForm  from "@/components/subscription/createdSubscription";
import subscriptionService from "@/services/subscriptionService";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CreateSubscription = () => {
  const router = useRouter();
  const { subscriptionPlanId } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
      }
    }
  }, []);

  const fetcher = async (key: string) => {
    const [subscriptionResponse] = await Promise.all([
      subscriptionPlanService.getSubscriptionPlanById(
        subscriptionPlanId as string
      ),
    ]);

    if (subscriptionResponse.ok) {
      const [subscriptionPlan] = await Promise.all([
        subscriptionResponse.json(),
      ]);
      return { subscriptionPlan };
    }
  };
  const { data, isLoading, error } = useSWR("subscriptioPlanCourse", fetcher);
  console.log("Data:", data);
  console.log("User:", user);
  
  return (
    <>
      <Head>
        <title>New subscription</title>
      </Head>
      <Header />
      
      <section className="w-50">
        {error && <p className="text-danger">{error}</p>}
        {isLoading && <p className="text-green-800">Loading...</p>}
        {data && user && (
          <SubscriptionForm subscriptionPlan={data.subscriptionPlan} user={user} />
        )}
        
      </section>
    </>
  );
};


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default CreateSubscription;
