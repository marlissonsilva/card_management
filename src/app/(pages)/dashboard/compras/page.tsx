"use client";
import { CardPurchase } from "@/src/app/components/CardPurchase";
import { useInstallments } from "@/src/app/hooks/useInstallments";

export default function Page() {
  const installments = useInstallments();

  return (
    <section className="flex flex-col gap-2">
      {installments.data.map((item) => (
        <CardPurchase key={item.uuid} data={item} />
      ))}
      {installments.data.length === 0 && (
        <div className="text-center pt-20">Sem compras cadastradas!</div>
      )}
    </section>
  );
}
