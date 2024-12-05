import { SubscriptionPlan } from "@/types";
import styles from "@/styles/Home.module.css";

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
            <div className={styles.card}>
              <span>
                <h2>{subscriptionPlan.type}</h2>
                <p>{subscriptionPlan.description}</p>
                <p>Price: {subscriptionPlan.price}</p>
                <p>
                  Duration: {subscriptionPlan.duration}
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
