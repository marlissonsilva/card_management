"use client";
import { CardMember, SkeletonMember } from "@/src/app/components/CardMember";
import { useMembers } from "@/src/app/hooks/useMembers";

export default function Page() {
  const { data, loading } = useMembers();

  return (
    <section className="flex flex-col gap-2">
      {loading && <SkeletonMember />}
      {data.map((member) => (
        <CardMember key={member.uuid} data={member} />
      ))}
      {!loading && data.length === 0 && (
        <div className="text-center pt-20">Sem membros cadastrados!</div>
      )}
    </section>
  );
}
