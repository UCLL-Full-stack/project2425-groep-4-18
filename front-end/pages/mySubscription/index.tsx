import Header from "@/components/header";
import SubscriptionTable from "@/components/subscription/subscriptionTable";
import subscriptionService from "@/services/subscriptionService";
import { Subscription } from "@/types";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
type UserType = {
  firstname: string;
  password: string;
  token: string;
};
const Register: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [subscription, setsubscription] = useState<Array<Subscription>>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setLoggedInUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
      }
    }
  }, []);
  const getSubscriptionplans = async () => {
    setError("");
    if (!loggedInUser?.firstname) {
      setError("User firstname is not available.");
      return;
    }
    try {
      const response = await subscriptionService.getSubscriptionByFistname(
        loggedInUser.firstname
      );

      if (!response.ok) {
        setError(response.statusText);
      } else {
        const subscription = await response.json();
        setsubscription(subscription);
      }
    } catch (err) {
      setError("Failed to fetch subscription plans.");
      console.error(err);
    }
  };

  useEffect(() => {
    getSubscriptionplans();
  }, [loggedInUser]);

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
          {subscription && <SubscriptionTable subscription={subscription} />}
        </section>
      </main>
      <div className="container mx-auto">
        <p>kfdl</p>
      </div>
    </>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Register;
