"use client";
import { CardMember, SkeletonMember } from "@/src/app/components/CardMember";
import { NoData } from "@/src/app/components/NoData";
import { useMembers } from "@/src/app/hooks/useMembers";

export default function Page() {
  const { data, loading } = useMembers();

  return (
    <section className="flex flex-col gap-2 h-[80vh]">
      {loading && <SkeletonMember />}
      {data.map((member) => (
        <CardMember key={member.uuid} data={member} />
      ))}
      {!loading && data.length === 0 && (
        <NoData message="Sem membros cadastrados!" />
      )}
    </section>
  );
}
