import { Button } from "@/components/ui/button";
import { currencyFormat } from "../../utils/currencyFormat";
import styles from "./Card.module.css";
import { toastNotify } from "../../utils/toastNotify";
import { HandCoins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
      .then(() => {
        console.log("Texto copiado com sucesso!");
        toastNotify({
          title: "Mensagem de cobrança gerada com sucesso",
        });
      })
      .catch((err) => console.error("Falha ao copiar texto: ", err));
  };

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{name}</h3>
        <span className={`${styles.amount} md:hidden`}>
          {currencyFormat(totalAmountPurchases)}
        </span>
      </div>
      <div className="flex gap-10 items-center">
        <span className={`${styles.amount} hidden md:flex`}>
          {currencyFormat(totalAmountPurchases)}
        </span>
        <Button className="px-8" onClick={handlePaymentReminder}>
          <HandCoins />
          Cobrar
        </Button>
      </div>
    </div>
  );
}

export function SkeletonMember() {
  return (
    <>
      {[...Array(8)].map((item, i) => (
        <Skeleton key={i} className="w-full h-14 rounded-sm" />
      ))}
    </>
  );
}
