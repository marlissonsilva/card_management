"use client";
import {
  CardPurchase,
  SkeletonPurchase,
} from "@/src/app/components/CardPurchase";
import { NoData } from "@/src/app/components/NoData";
import { useInstallments } from "@/src/app/hooks/useInstallments";

export default function Page() {
  const { data, loading } = useInstallments();

  return (
    <section className="flex flex-col gap-2 h-[80vh] pr-2 overflow-auto">
      {loading && <SkeletonPurchase />}
      {data.map((item) => (
        <CardPurchase key={item.uuid} data={item} />
      ))}
      {!loading && data.length === 0 && (
        <NoData message="Sem compras cadastradas!" />
      )}
    </section>
  );
}
