import { SubscriptionPlan } from "@/types";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

type Props = {
  subscriptionplans: Array<SubscriptionPlan>;
  selectSubscriptionPlan: (subscriptionPlan: SubscriptionPlan) => void;
};

const SubscriptionPlanTable: React.FC<Props> = ({
  subscriptionplans,
  selectSubscriptionPlan,
}: Props) => {
  return (
    <>
      {subscriptionplans && (
        <>
          {subscriptionplans.map((subscriptionPlan, index) => (
            <div key={index} className={styles.card}>
              <span>
                <h2>{subscriptionPlan.type}</h2>
                <p>{subscriptionPlan.description}</p>
                <p>Price: {subscriptionPlan.price}</p>
                <p>Duration: {subscriptionPlan.duration} month</p>
                <Link
                  href={`subscriptionPlan/${encodeURIComponent(
                    subscriptionPlan.id
                  )}`}
                >
                  <button className="w-full bg-slate-600 text-white font-medium text-lg p-2 rounded-md hover:bg-slate-800">
                    buy
                  </button>
                </Link>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SubscriptionPlanTable;
