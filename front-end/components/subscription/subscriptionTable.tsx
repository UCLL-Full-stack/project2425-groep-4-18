import { Subscription } from "@/types";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

type Props = {
  subscription: Array<Subscription>;
};

const SubscriptionPlanTable: React.FC<Props> = ({ subscription }: Props) => {
  return (
    <>
      {subscription && (
        <>
          {subscription.map((subscription, index) => (
            <div key={index} className={styles.card}>
              <span>
                <h2>{subscription.subscriptionPlan.type}</h2>
                <p>
                  startDate:{" "}
                  {subscription.startDate
                    ? new Date(subscription.startDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  endDate:{" "}
                  {subscription.endDate
                    ? new Date(subscription.endDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SubscriptionPlanTable;
