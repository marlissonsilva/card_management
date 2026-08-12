import { Member } from "@/src/generated/prisma/client";
import { currencyFormat } from "../../utils/currencyFormat";
import { dateFormat } from "../../utils/dateFormat";
import styles from "./Card.module.css";

interface CardMemberProps {
  data: {
    totalAmountPurchases: number;
    name: string;
    uuid: string;
    user_uuid: string;
    created_at: Date;
    updated_at: Date;
  };
}

export function CardMember({ data }: CardMemberProps) {
  const { name, totalAmountPurchases } = data;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <span className={styles.amount}>
        {currencyFormat(totalAmountPurchases)}
      </span>
    </div>
  );
}
