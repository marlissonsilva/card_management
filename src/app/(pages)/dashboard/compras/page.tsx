"use client";
import {
  CardPurchase,
  SkeletonPurchase,
} from "@/src/app/components/CardPurchase";
import { useInstallments } from "@/src/app/hooks/useInstallments";

export default function Page() {
  const { data, loading } = useInstallments();

  return (
    <section className="flex flex-col gap-2 h-[80vh] overflow-auto">
      {loading && <SkeletonPurchase />}
      {data.map((item) => (
        <CardPurchase key={item.uuid} data={item} />
      ))}
      {!loading && data.length === 0 && (
        <div className="text-center pt-20">Sem compras cadastradas!</div>
      )}
    </section>
  );
}
