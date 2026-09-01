import { Skeleton } from "@/components/ui/skeleton";
import { currencyFormat } from "../../utils/currencyFormat";
import { dateFormat } from "../../utils/dateFormat";
import styles from "./Card.module.css";

type DataType = {
  purchase_uuid: string;
  installment_number: number;
  value: number;
  due_date: Date;
  is_paid: boolean;
  created_at: Date;
  updated_at: Date;
  uuid: string;
  purchase: {
    description: string;
    installments_count: number;
    date_purchase: Date;
    member: { name: string };
  };
};

interface CardProps {
  data: DataType;
}

export function CardPurchase({ data }: CardProps) {
  const { purchase, installment_number, value } = data;

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{purchase.description}</h3>
        <div className={styles.wrapper_left}>
          <span className={styles.member}>{purchase.member.name}</span>
          <span className={styles.date}>
            Comprado em: {dateFormat(purchase.date_purchase)}
          </span>
        </div>
      </div>
      <div className={styles.wrapper_right}>
        <span className={styles.amount}>{currencyFormat(value)}</span>
        <div>
          <span className={styles.installments}>
            {installment_number}/{purchase.installments_count}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPurchase() {
  return (
    <>
      {[...Array(8)].map((item, i) => (
        <Skeleton key={i} className="w-full h-18 rounded-sm" />
      ))}
    </>
  );
}
