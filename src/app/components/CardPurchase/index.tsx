import { currencyFormat } from "../../utils/currencyFormat";
import { dateFormat } from "../../utils/dateFormat";
import styles from "./Card.module.css";

type DataType = {
  member: { name: string };
  uuid: string;
  description: string;
  amount: number;
  status: string;
  date_purchase: Date;
  installments_count: number;
  created_at?: Date;
  updated_at?: Date;
};

interface CardProps {
  data: DataType;
}
export function Card({ data }: CardProps) {
  const { amount, date_purchase, description, installments_count, member } =
    data;

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{description}</h3>
        <div className={styles.wrapper_left}>
          <span className={styles.member}>{member.name}</span>
          <span className={styles.date}>{dateFormat(date_purchase)}</span>
        </div>
      </div>
      <div className={styles.wrapper_right}>
        <span className={styles.amount}>{currencyFormat(amount)}</span>
        <span className={styles.installments}>{installments_count}</span>
      </div>
    </div>
  );
}
