"use client";
import { Card } from "@/src/app/components/CardPurchase";
import { useCreatePurchaseStore } from "@/src/app/store/useCreatePurchase";
import { useModalStore } from "@/src/app/store/useModalStore";
import { findAllPurchases } from "@/src/backend/Purchase/findAll";
import { useEffect, useState } from "react";

type PurchaseWithMember = Awaited<ReturnType<typeof findAllPurchases>>[number];

export default function Page() {
  const created = useCreatePurchaseStore((state) => state.created);
  const isOpen = useModalStore((state) => state.isOpen);
  const [purchases, setPurchases] = useState<PurchaseWithMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const purchases = await findAllPurchases();
      setPurchases(purchases);
    };
    fetchData();
  }, [created, isOpen]);

  return (
    <section className="flex flex-col gap-2">
      {purchases.map((item) => (
        <Card key={item.uuid} data={item} />
      ))}
    </section>
  );
}
