"use client";
import { CardPurchase } from "@/src/app/components/CardPurchase";
import { useCreatePurchaseStore } from "@/src/app/store/useCreatePurchase";
import { useModalStore } from "@/src/app/store/useModal";
import { useMonthStore } from "@/src/app/store/useMonth";
import { currencyFormat } from "@/src/app/utils/currencyFormat";
import { findInstallmentsByMonth } from "@/src/backend/Installment/findInstallmentsByMonth";
import { useEffect, useState } from "react";

type InstallmentsItem = Awaited<
  ReturnType<typeof findInstallmentsByMonth>
>["data"][number];

export default function Page() {
  const created = useCreatePurchaseStore((state) => state.created);
  const isOpen = useModalStore((state) => state.isOpen);
  const [installments, setInstallments] = useState<InstallmentsItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const month = useMonthStore((state) => state.month);
  console.log({ month });

  useEffect(() => {
    const fetchData = async () => {
      const response = await findInstallmentsByMonth(month);
      setTotalAmount(response.totalAmount);
      setInstallments(response.data);
    };
    fetchData();
  }, [created, isOpen, month]);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-end">
        <p>
          Fatura atual:
          <span className="font-semibold text-xl p-1"> {currencyFormat(totalAmount)}</span>
        </p>
      </div>
      {installments.map((item) => (
        <CardPurchase key={item.uuid} data={item} />
      ))}
    </section>
  );
}
