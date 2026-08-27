import { currencyFormat } from "../../utils/currencyFormat";
import styles from "./Card.module.css";

interface CardMemberProps {
  data: {
    totalAmountPurchases: number;
    invloceClosing: number;
    name: string;
    uuid: string;
  };
}

export function CardMember({ data }: CardMemberProps) {
  const { name, totalAmountPurchases, invloceClosing } = data;

  const handlePaymentReminder = () => {
    navigator.clipboard
      .writeText(
        `Olá ${name}, sua parte na fatura deste mês é de ${currencyFormat(totalAmountPurchases)}.
        O vencimento é dia ${invloceClosing + 7}. Valeu!"`,
      )
      .then(() => console.log("Texto copiado com sucesso!"))
      .catch((err) => console.error("Falha ao copiar texto: ", err));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <div className="flex gap-10 items-center">
        <span className={styles.amount}>
          {currencyFormat(totalAmountPurchases)}
        </span>
        <button
          className="border px-3 py-1 rounded-sm"
          onClick={handlePaymentReminder}
        >
          Cobrar
        </button>
      </div>
    </div>
  );
}
